import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const api = axios.create({
        baseURL: 'https://961mfdzq-3000.uks1.devtunnels.ms', // Replace with your API base URL "Porta"
        headers: {
            'Content-Type': 'application/json',
            /* Authorization: `Bearer ${token}`, */
        },
    });

    //--------------------------Test------------
    /* api.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }); */
    //-----------------------test v2 interceptors
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


    //working
    const registerUser = async (userData) => {
        try {
            const response = await api.post('/register', userData);
            return response.data;
        } catch (error) {
            console.error('Registration failed:', error.response.data);
            throw error;
        }
    };

    //working ---commented to test better login
    /*   const loginUser = async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            setToken(response.data.token);
            //For debugging --Delete-- Security Hazard -RM
            console.log("My token Response:\n", response.data.token, "\nMy User Id:", response.data.user_id);
            //---------------------------------------------------
            setUser({ id: response.data.user_id });
            return response.data;
        } catch (error) {
            console.error('Login failed:', error.response.data || error.message);
            throw error;
        }
    }; */

    //_-----------------------------------------------------
    //login v2
    // Login User and Fetch Complete Profile
    const loginUser = async (credentials) => {
        try {
            // Attempt to log in the user with provided credentials
            const response = await api.post('/login', credentials);

            // Set the token in state and localStorage
            setToken(response.data.token);
            localStorage.setItem('token', response.data.token);

            // Fetch the user's profile including admin status
            const profileResponse = await api.get('/profile', {
                headers: {
                    Authorization: `Bearer ${response.data.token}`,
                },
            });

            // Set the user profile in state and localStorage
            setUser(profileResponse.data);
            localStorage.setItem('user', JSON.stringify(profileResponse.data));

            return profileResponse.data;

        } catch (error) {
            // Handle any errors that occurred during login or profile fetching
            console.error('Error during login or fetching user profile:', error.response ? error.response.data : error.message);
            throw new Error('Login or profile fetching failed. Please try again.');
        }
    };
    //_-----------------------------------------------------

    /* const logoutUser = async () => {
        try {
            localStorage.removeItem('token'); //Sends token to tokens'heaven
            setToken(null);
            setUser(null);
            console.log("user logged out")
            //could also return true for feedback
            //It would be also possible to invalidate token on server side

        } catch (error) {
            console.error('Logout failed:', error.response.data);
            throw error;
        }
    }; */

    //-----------------------log out v2
    // Logout User
    const logoutUser = async () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
            console.log("User logged out");
        } catch (error) {
            console.error('Logout failed:', error.response.data);
            throw error;
        }
    };
    //---------------------------------

    const get_user_profile = async () => {
        try {
            const response = await api.get('/get_user_profile');
            // Killing Bugs Porpose
            console.log("Response:", response.data);
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Fetching profile failed:', error.response.data);
            throw error;
        }
    };
    //Delete User account and end session
    const deleteUser = async () => {
        try {
            // The token is automatically included in the headers by the Axios interceptor
            const response = await api.delete('/delete_user');
            console.log("User deleted successfully:", response.data);
            logoutUser();  // Assuming logoutUser clears local storage and context state
            return response.data;
        } catch (error) {
            console.error("Error deleting user account:", error.response ? error.response.data : error.message);
            throw error;
        }
    };


    // single user by jwt its not very helpfull make route user/<id>?
    //or erase
    const getProfile = async () => {
        try {
            const response = await api.get('/profile');
            //Killing bugs porposes
            console.log("Response:", response.data)
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Fetching profile failed:', error.response.data);
            throw error;
        }
    };
    // Restore token and user profile from localStorage on app load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    //-----User Animal Interactions----------

    //CreateAdoption (adopt)
    const createAdoption = async (adoptionData) => {
        try {
            const response = await api.post('/adopt', adoptionData);
            console.log("I am respose from create adoption", response)
            return response.data;
        } catch (error) {
            console.error('Adoption creation failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    };

    //-------------------------------------------------------------------------
    const listAnimals = async () => {
        try {
            const response = await api.get('/animals');
            return response.data;
        } catch (error) {
            console.error('Fetching animals failed:', error.response.data);
            throw error;
        }
    };
    //List Single Animal
    const getAnimal = async (animalId) => {
        try {
            const response = await api.get(`/animal/${animalId}`);
            return response.data;
        } catch (error) {
            console.error(`Fetching animal with ID ${animalId} failed:`, error.response ? error.response.data : error.message);
            throw error;
        }
    };

    // Auto-login if token is available
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            /* getProfile(); */
        }
    }, []);

    //-------####-Admin Features-###----------------
    //Add Single Animal W/ Photo
    const addAnimal = async (animalData, imageFiles) => {
        const formData = new FormData();
        formData.append('name', animalData.name);
        formData.append('species', animalData.species);
        formData.append('gender', animalData.gender);
        formData.append('life_stage', animalData.lifeStage);
        formData.append('weight', animalData.weight);
        formData.append('breed', animalData.breed);
        formData.append('location', animalData.location);
        formData.append('known_illness', animalData.knownIllness);
        formData.append('description', animalData.description);

        // Handle multiple images
        if (imageFiles && imageFiles.length > 0) {
            // Append each file to the form data
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('image', imageFiles[i]);
            }
        }

        try {
            const response = await api.post('/admin_add_animal', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  //Necessary because of api.create
                }
            });
            console.log('Another Pawosome member added successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error adding animal:', error.response ? error.response.data : error.message);
            throw error;
        }
    };


    //Delete Animal
    const deleteAnimal = async (animalId) => {
        try {
            await api.delete(`/admin_delete_animal/${animalId}`);
        } catch (error) {
            console.error(`Deleting animal with ID ${animalId} failed:`, error.response ? error.response.data : error.message);
            throw error;
        }
    };
    //Delete Sinlge Image by id
    const deleteImage = async (imageId) => {
        try {
            await api.delete(`/delete_image/${imageId}`);
            console.log(`Image with ID ${imageId} deleted successfully.`);
        } catch (error) {
            console.error(`Deleting image with ID ${imageId} failed:`, error.response ? error.response.data : error.message);
            throw error;
        }
    };

    //---New: Update Adoption Status--- And Adoptions Related 

    const updateAdoptionStatus = async (adoptionId, newStatus) => {
        try {
            const response = await api.put(`/update_adoption_status/${adoptionId}`, {
                adoption_status: newStatus,
            });
            console.log('Adoption status updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error(`Updating adoption status failed:`, error.response ? error.response.data : error.message);
            throw error;
        }
    };
    // New function to get all adoptions with animal images
    const getAllAdoptions = async () => {
        try {
            const response = await api.get('/adoptions');
            return response.data;
        } catch (error) {
            console.error('Fetching adoptions failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    };

    //Sync the token with the local storage - omg
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    return (
        <APIContext.Provider
            value={{
                user,
                token,
                registerUser,
                loginUser,
                logoutUser,
                getProfile,
                deleteUser,
                get_user_profile,
                createAdoption,
                getAllAdoptions,
                updateAdoptionStatus,
                listAnimals,
                getAnimal,
                deleteAnimal,
                deleteImage,
                addAnimal,
            }}
        >
            {children}
        </APIContext.Provider>
    );
};

export const useAPI = () => useContext(APIContext);

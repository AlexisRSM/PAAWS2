import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const APIContext = createContext();

export const APIProvider = ({ children }) => {
    const publishableKey = import.meta.env.VITE_PUBLISHABLE_KEY;
    const stripePromise = loadStripe('pk_test_51PpLYtIZE8iI5Xv6223PXSNVJKFJVgctliIQyi9w5fWQYFvswR6JOX8m76glrAuTMri6evVlnGOKYaa0pw69Jp4A00LvdG6UQO');

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    //cd Mudei o url para a versao deployed da nossa API
    const url = `https://final-project-paaws-back-end.onrender.com`; //url to change api rquests -RM

    const api = axios.create({
        /*  baseURL: 'https://961mfdzq-3000.uks1.devtunnels.ms', // Replace with your API base URL "Porta" */
        /* baseURL: 'https://solid-couscous-wr9p957994vh9jp5-3000.app.github.dev', // Link codespaces espero que nao falhe */

        baseURL: `${url}`, // Link codespaces espero que nao falhe

        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
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

    //For auto log out when token expires 
    /*     api.interceptors.response.use(
            response => response,
            async (error) => {
                // Check if the error response status is 401 (Unauthorized)
                if (error.response && error.response.status === 401) {
                    // Call the logoutUser function to clear the session and redirect
                    await logoutUser();
                }
    
                return Promise.reject(error);
            }
        ); */


    //Interceptors v3
    /*    api.interceptors.response.use(
            response => response,
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    // Assume you have a function to get a new token
                    const newToken = await refreshToken();
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
                    return api(originalRequest);
                }
                return Promise.reject(error);
            }
        ); */



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

    // Update user data
    const updateUserInfo = async (updatedData) => {
        try {
            const response = await api.put('/update_user', updatedData);
            setUser(response.data.user); // Update the user state with the updated data
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Sync updated user data with localStorage
            return response.data;
        } catch (error) {
            console.error('Updating user data failed:', error.response ? error.response.data : error.message);
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

    // Function to create a one-time payment session
    const createOneTimePaymentSession = async (animalId, amount) => {
        try {
            const response = await api.post('/create-checkout-session', {
                animal_id: animalId,
                sponsorship_amount: amount,
                currency: 'eur' // Update to EUR
            });

            const sessionId = response.data.id;
            const stripe = await stripePromise;

            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error('Stripe error:', error);
            }
        } catch (error) {
            console.error('Error creating one-time payment session:', error);
            throw error;
        }
    };

    // Function to create a subscription session
    const createSubscriptionSession = async (animalId, amount) => {
        try {
            const response = await api.post('/create-subscription-session', {
                animal_id: animalId,
                sponsorship_amount: amount,
                currency: 'eur' // Update to EUR
            });

            const sessionId = response.data.id;
            const stripe = await stripePromise;

            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error('Stripe error:', error);
            }
        } catch (error) {
            console.error('Error creating subscription session:', error);
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
    //Update Animal
    // Update Animal with Photos
    const updateAnimal = async (animalId, animalData, imageFiles) => {
        const formData = new FormData();
        formData.append('name', animalData.name);
        formData.append('species', animalData.species);
        formData.append('gender', animalData.gender);
        formData.append('life_stage', animalData.life_stage);
        formData.append('weight', animalData.weight);
        formData.append('breed', animalData.breed);
        formData.append('location', animalData.location);
        formData.append('known_illness', animalData.known_illness);
        formData.append('description', animalData.description);

        // Handle multiple images
        if (imageFiles && imageFiles.length > 0) {
            // Append each file to the form data
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('image', imageFiles[i]);
            }
        }

        try {
            const response = await api.put(`/admin_update_animal/${animalId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'  // Necessary to handle file uploads
                }
            });
            console.log('Animal updated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating animal:', error.response ? error.response.data : error.message);
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

    //---New: Update Adoption Status--- And Adoptions Related é este 4september

    /*     const updateAdoptionStatus = async (adoptionId, newStatus) => {
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
        }; */

    const updateAdoptionStatus = async (animalId, adoptionId, newStatus) => {
        try {
            // Step 1: Fetch all adoption processes for the specific animal
            const adoptionProcesses = await api.get(`/adoptions_for_animal/${animalId}`);

            if (!adoptionProcesses.data || adoptionProcesses.data.length === 0) {
                throw new Error(`No adoption processes found for animal ID: ${animalId}`);
            }

            // Step 2: Iterate over the adoption processes
            for (const adoptionProcess of adoptionProcesses.data) {
                if (adoptionProcess.id === adoptionId && newStatus === "Approved") {
                    // If this is the selected adoption process and status is "Approved", approve it
                    await api.put(`/update_adoption_status/${adoptionId}`, {
                        adoption_status: "Approved",
                    });
                    console.log(`Adoption process ${adoptionId} approved successfully.`);
                } else {
                    // Reject all other adoption processes
                    await api.put(`/update_adoption_status/${adoptionProcess.id}`, {
                        adoption_status: "Rejected",
                    });
                    console.log(`Adoption process ${adoptionProcess.id} rejected.`);
                }
            }

            return { message: "Adoption processes updated successfully." };
        } catch (error) {
            console.error(`Updating adoption processes failed:`, error.response ? error.response.data : error.message);
            throw error;
        }
    };



    // ------------------------------------------------------------------------------

    /*  const updateAdoptionStatus = async (adoptionId, newStatus) => {
         try {
             // Step 1: Fetch the current adoption request to get the animal ID
             const adoptionResponse = await api.get(`/adoption/${adoptionId}`);
             const adoption = adoptionResponse.data;
             const animalId = adoption.animal_id;
 
             // Step 2: If the new status is "approved", reject all other pending adoptions for the same animal
             if (newStatus === 'approved') {
                 // Fetch all pending adoptions for the same animal
                 const allAdoptionsResponse = await api.get(`/adoptions`);
                 const pendingAdoptions = allAdoptionsResponse.data.filter(
                     (adoption) => adoption.animal_id === animalId && adoption.adoption_status === 'pending'
                 );
 
                 // Reject each pending adoption
                 for (let pendingAdoption of pendingAdoptions) {
                     if (pendingAdoption.id !== adoptionId) {
                         await api.put(`/update_adoption_status/${pendingAdoption.id}`, {
                             adoption_status: 'rejected',
                         });
                     }
                 }
             }
 
             // Step 3: Update the status of the current adoption request
             const response = await api.put(`/update_adoption_status/${adoptionId}`, {
                 adoption_status: newStatus,
             });
 
             console.log('Adoption status updated successfully:', response.data);
             return response.data;
         } catch (error) {
             console.error(`Updating adoption status failed:`, error.response ? error.response.data : error.message);
             throw error;
         }
     }; */

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

    const fetchAdoptionForm = async (id) => {
        try {
            const response = await api.get(`/adoption_form/${id}`);
            return { data: response.data, error: null };  // Return the data if successful
        } catch (error) {
            // Return the error message
            return { data: null, error: error.response ? error.response.data.error : 'Failed to fetch adoption form' };
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
                url,
                registerUser,
                loginUser,
                logoutUser,
                getProfile,
                updateUserInfo,
                deleteUser,
                get_user_profile,
                createAdoption,
                createOneTimePaymentSession,
                createSubscriptionSession,
                getAllAdoptions,
                updateAdoptionStatus,
                fetchAdoptionForm,
                listAnimals,
                getAnimal,
                updateAnimal,
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

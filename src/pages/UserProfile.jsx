// Banner welcoming the user to their page

// Add scrollable sponsor section featuring the pets receiving donations for user (maybe add status label for active/inactive??)

// Add also section for adoptions with status (approved, pending, rejected)

// In case we have time, add user milestones

// Add money spent in sponserships and how much they'll spend this month ----maybe not for presentation or just money contributed for each

import AdoptionCard from "../components/AdoptionCard";
import SponsoredCard from "../components/SponsoredCard";
//Added by RM
import React, { useEffect, useState } from 'react';
import { useAPI } from '../pages/Context/Context';
import newloadingcato from '../images/gifs/newloadingcato.gif'
import { Container } from 'react-bootstrap';

//omfg You have no idea it took me like 4 hrs--- 🥲 its working
//missing check when have connections in db sponsored and adoption processes
//but data is flowing here
function UserProfile() {

    const { get_user_profile, user } = useAPI(); // Remove user and get it from localstorage -RM; (should we?)
    const [sponsoredPets, setSponsoredPets] = useState([]);
    const [adoptionProcesses, setAdoptionProcesses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the  user profile data when the component mounts
        const fetchUserProfile = async () => {
            try {
                const profileData = await get_user_profile();
                console.log("I am User Profile page printing profileData", profileData)
                // Remove duplicate sponsored pets by their ID
                // Create a map to sum sponsorship amounts by animal_id
                const sponsorshipMap = profileData.sponsored_pets.reduce((map, pet) => {
                    const { animal_id, sponsorship_amount } = pet;
                    const amount = parseFloat(sponsorship_amount);

                    if (map.has(animal_id)) {
                        // If the animal_id already exists, add the current amount to the total
                        map.set(animal_id, {
                            ...map.get(animal_id),
                            total_sponsorship_amount: map.get(animal_id).total_sponsorship_amount + amount,
                        });
                    } else {
                        // If the animal_id doesn't exist, set it with the current amount
                        map.set(animal_id, {
                            ...pet,
                            total_sponsorship_amount: amount,
                        });
                    }

                    return map;
                }, new Map());

                // Convert the map values to an array
                const uniqueSponsoredPets = Array.from(sponsorshipMap.values());

                // Log the uniqueSponsoredPets array for debugging
                console.log("Unique Sponsored Pets:", uniqueSponsoredPets);

                setSponsoredPets(uniqueSponsoredPets); // Set the filtered and summed pets
                setAdoptionProcesses(profileData.adoptions || []); // Set the adoption processes
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setLoading(false); // Loading complete
            }
        };

        fetchUserProfile();
        console.log("I am UserProfile Page printing adoption processes state: ", adoptionProcesses)
    }, []); // Empty dependency array means this effect runs once on mount

    // Display loading message while fetching
    if (loading) {
        return <div>
            <img src={newloadingcato}></img>
        </div>;
    }

    return (
        <Container fluid className="profileContainer">
            <div className="pageHeader userProfileHeader">
                <h1>Welcome back, {user ? user.first_name : 'User'}!</h1>
                <p className="pageHeaderText">You have contributed {user ? user.total_spent : 0}€ so far. </p>
            </div>
            <h4 className='userHeader'>Your sponsored pets</h4>
            <div className="scrollingWrapper">
                {sponsoredPets.map((pet, index) => (
                    <SponsoredCard key={index} pet={pet} />
                ))}
            </div>
            <h4 className='userHeader'>Your adoption processes</h4>
            <div className="scrollingWrapper">
                {adoptionProcesses.map((process, index) => (
                    <AdoptionCard key={index} process={process} />
                ))}
            </div>
        </Container>
    );
}

export default UserProfile;
import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import thirdloadingcat from '../images/gifs/thirdloadingcat.gif';

import FilterSection from '../components/FilterSection';
import AnimalCard from '../components/RegularCard';
import { useAPI } from '../pages/Context/Context';
import autoAnimate from '@formkit/auto-animate';

function AnimalSearch() {
    const { listAnimals } = useAPI();
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [filters, setFilters] = useState({
        species: {},
        gender: {},
        life_stage: {},
        known_illness: {},
        location: '',
    });
    const [sortOption, setSortOption] = useState('name');
    const [loading, setLoading] = useState(true); // Add loading state


    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            autoAnimate(containerRef.current);
        }
    }, [containerRef]);

    // Fetch animals on component mount
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const animalData = await listAnimals();
                console.log(animalData);
                const normalizedData = animalData.map(animal => ({
                    ...animal,
                }));
                setAnimals(normalizedData);
                setFilteredAnimals(normalizedData); // Initialize with all animals
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                console.error('Failed to fetch animals:', error);
                setLoading(false); // Set loading to false even if there is an error
            }
        };
        fetchAnimals();
    }, [listAnimals]);

    // Apply filters and sorting
    useEffect(() => {
        let result = animals;

        // Apply species filter 
        if (Object.values(filters.species).some(Boolean)) {
            result = result.filter(animal => filters.species[animal.species]);
        }

        // Apply gender filter
        if (Object.values(filters.gender).some(Boolean)) {
            result = result.filter(animal => filters.gender[animal.gender]);
        }

        // Apply life stage filter
        if (Object.values(filters.life_stage).some(Boolean)) {
            result = result.filter(animal => filters.life_stage[animal.life_stage]);
        }

        // Apply known illness filter
        if (Object.values(filters.known_illness).some(Boolean)) {
            result = result.filter(animal => filters.known_illness[animal.known_illness]);
        }

        // Apply location filter
        if (filters.location) {
            result = result.filter(animal => animal.location.trim().toLowerCase() === filters.location.toLowerCase());
        }

        // Simple scalable way to not mess up sort by :D 
        const lifeStageOrder = {
            'baby': 1,
            'junior': 2,
            'adult': 3,
            'senior': 4
        };

        // Apply sorting
        result = result.sort((a, b) => {
            if (sortOption === 'name') {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            } else if (sortOption === 'age') {
                return (lifeStageOrder[a.life_stage] || 0) - (lifeStageOrder[b.life_stage] || 0);
            }
            return 0;
        });

        setFilteredAnimals(result);
    }, [filters, sortOption, animals]);

    return (
        <>
            <div className="pageHeader animalSearchHeader">
                <h1>Our Pets</h1>
                <p className="pageHeaderText">Check out these cuties</p>
            </div>
            <Container fluid className="animalSearchContainer">
                <Row>
                    <Col lg={3}>
                        <FilterSection filters={filters} setFilters={setFilters} />
                    </Col>
                    <Col lg={9} ref={containerRef}>
                        {loading ? (
                            <div className="loading-container">
                                <img src={thirdloadingcat} alt="Loading..." />
                            </div>
                        ) : (
                            <div className="animalGrid">
                                <Row>
                                    {filteredAnimals.length > 0 ? (
                                        filteredAnimals.map((animal) => (
                                            <Col xs={12} sm={6} md={6} lg={4} key={animal.id} className="animalCard">
                                                <AnimalCard animal={animal} />
                                            </Col>
                                        ))
                                    ) : (
                                        <Col>
                                            <p>No animals match the selected filters.</p>
                                        </Col>
                                    )}
                                </Row>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default AnimalSearch;

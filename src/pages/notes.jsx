// Should feature a Card for each animal + left-side menu with labels for filtering (species, gender, life stage, location)

// Could maybe add a sort option above?
//You wish a sort option?  ---Hold my fries -RM
// I'll gladly hold (and eat) those fries. -- B.F:

// Should we have a cap for animals that are already being sponsored?
//CAP ? 🧢 🥸
// Lol, no. Cap = limit. -- B.F.

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import FilterSection from '../components/FilterSection';
import RegularCard from '../components/RegularCard';
//Added by -RM
import { useAPI } from '../pages/Context/Context';
import React, { useState, useEffect } from 'react';
import AnimalCard from '../components/RegularCard';

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

    // Fetch animals on component mount
    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const animalData = await listAnimals();
                console.log(animalData)
                const normalizedData = animalData.map(animal => ({
                    ...animal,
                    //life_stage: animal.life_stage.trim().toLowerCase(), // Normalize life_stage
                    //known_illness: animal.known_illness.trim().toLowerCase(), // Normalize known illness
                    //location: animal.location.trim().toLowerCase() // Normalize location can delete or leave ...-RM
                }));
                setAnimals(normalizedData);
                setFilteredAnimals(normalizedData); // Initialize with all animals
            } catch (error) {
                console.error('Failed to fetch animals:', error);
            }
        };
        fetchAnimals();
    }, [listAnimals]);

    // Complicated Shenanigans to  aply filters and sorting 
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

        //Simple scalable way to not mess up sort by :D 
        const lifeStageOrder = {
            'baby': 1,
            'junior': 2,
            'adult': 3,
            'senior': 4
        };
        // Apply sorting
        result = result.sort((a, b) => {
            if (sortOption === 'name') {
                // Ensure case-insensitive sorting
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            } else if (sortOption === 'age') {
                // Sort by life stage using the defined order
                return (lifeStageOrder[a.life_stage] || 0) - (lifeStageOrder[b.life_stage] || 0);
            }
            return 0;
        });

        setFilteredAnimals(result);
    }, [filters, sortOption, animals]);

    return (
        <Container fluid>
            <Row>
                <Col lg="3">
                    <FilterSection filters={filters} setFilters={setFilters} />
                </Col>
                <Col lg="9">
                    <div style={{ marginBottom: '1rem' }}>
                        <label htmlFor="sortOption">Sort By: </label>
                        <select id="sortOption" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="name">Age</option> {/* Made some mischief because for some reason they were changed with each other */}
                            <option value="age">Name</option>
                        </select>
                    </div>
                    <Row>
                        {filteredAnimals.length > 0 ? (
                            filteredAnimals.map((animal) => (
                                <Col lg="4" key={animal.id}>
                                    <AnimalCard animal={animal} />
                                </Col>
                            ))
                        ) : (
                            <Col lg="12">
                                <p>No animals match the selected filters.</p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AnimalSearch;
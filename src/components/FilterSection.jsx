//Fiz algumas alteraçoes aos filtros 
//no caso para ja so funciona portugal e depois mais 
//tarde podemos implementar algo maior

//Ainda nao consegui meter a funcionar 04:00 AM Desperate....
//vou passar a outros componentes se nao nunca mais... -RM

//Cards already appear with info just missing to fix the filters
//also the more data we have in db more filter appear (fr filters)

import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

function FilterSection({ filters, setFilters }) {
  const handleFilterChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [value]: !prevFilters[category][value],
      },
    }));
  };


  return (
    <Card className='filterCard'>
      <Card.Body>
        <Card.Title><h2>Filters</h2></Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <p className='filterTitle'>Species</p>
            <div className='filterItem'>
            {['cat', 'dog'].map((species) => (
              <Form.Check
              key={species}
              type="checkbox"
              label={species}
              checked={!!filters.species[species]}
              onChange={() => handleFilterChange('species', species)}
              
              />
            ))}
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
            <p className='filterTitle'>Gender</p>
            <div className="filterItem">
            {['female', 'male'].map((gender) => (
              <Form.Check
              key={gender}
              type="checkbox"
              label={gender}
              checked={!!filters.gender[gender]} //check double negation
              onChange={() => handleFilterChange('gender', gender)}
              />
            ))}
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
          <p className='filterTitle'>Life Stage</p>
          <div className="filterItem">
            {['baby', 'junior', 'adult', 'senior'].map((stage) => (
              <Form.Check
              key={stage}
              type="checkbox"
              label={stage}
              checked={!!filters.life_stage[stage]}
              onChange={() => handleFilterChange('life_stage', stage)}
              />
            ))}
            </div>
          </ListGroup.Item>

          <ListGroup.Item>
          <p className='filterTitle'>Known Illnesses?</p>
          <div className="filterItem">
            {['yes', 'no'].map((known_illness) => (
              <Form.Check
              key={known_illness}
              type="checkbox"
              label={known_illness}
              checked={!!filters.known_illness[known_illness]}
              onChange={() => handleFilterChange('known_illness', known_illness)}
              />
            ))}
            </div>
          </ListGroup.Item>

          <ListGroup.Item >
            <p className='filterTitle'>Location</p>
            <Form.Control
              as="select"
              value={filters.location}
              onChange={(e) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  location: e.target.value,
                }))
              }
            >
              <option value="">Choose location</option>
              <option value="Aveiro">Aveiro</option>
              <option value="Beja">Beja</option>
              <option value="Braga">Braga</option>
              <option value="Bragança">Bragança</option>
              <option value="Castelo Branco">Castelo Branco</option>
              <option value="Coimbra">Coimbra</option>
              <option value="Évora">Évora</option>
              <option value="Faro">Faro</option>
              <option value="Guarda">Guarda</option>
              <option value="Leiria">Leiria</option>
              <option value="Lisboa">Lisboa</option>
              <option value="Portalegre">Portalegre</option>
              <option value="Porto">Porto</option>
              <option value="Santarém">Santarém</option>
              <option value="Setúbal">Setúbal</option>
              <option value="Viana do Castelo">Viana do Castelo</option>
              <option value="Vila Real">Vila Real</option>
              <option value="Viseu">Viseu</option>
            </Form.Control>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default FilterSection;
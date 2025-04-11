import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useAPI } from '../pages/Context/Context';
import { useNavigate } from 'react-router-dom';
import logo from '../images/PAAWS_transparentBG.png';
import { Button } from 'react-bootstrap';

function NavigationBar() {
  const { logoutUser, user } = useAPI();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggleMenu = () => setShow(!show);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
      setShow(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar NavigationBar p-0" sticky="top">
      <Container fluid className="navbarContainer">
        <Link to="/" className="logoLink">
          <img src={logo} alt="PAAWS" className='PAAWSLogo' />
        </Link>

        {/* Botão do menu agora funciona como toggle */}
        <Button 
          variant="link" 
          onClick={toggleMenu} 
          className={`d-lg-none menuToggle ${show ? 'active' : ''}`}
          aria-expanded={show}
        >
          <i className={`fas ${show ? 'fa-times' : 'fa-bars'}`}></i>
        </Button>

        {/* Menu lateral */}
        <Offcanvas 
          show={show} 
          onHide={toggleMenu} 
          placement="end" 
          className="d-lg-none mobileMenu"
          backdrop={true}
        >
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link href="/" className='navbarItem' onClick={toggleMenu}>Home</Nav.Link>
              <Nav.Link href="/ourpets" className='navbarItem' onClick={toggleMenu}>Our Pets</Nav.Link>
              <Nav.Link href="/aboutus" className='navbarItem' onClick={toggleMenu}>About Us</Nav.Link>
              <Nav.Link href="/successstories" className='navbarItem' onClick={toggleMenu}>Success Stories</Nav.Link>
              
              {user ? (
                <>
                  <Nav.Link href="/userprofile" onClick={toggleMenu}>Profile</Nav.Link>
                  <Nav.Link href="/personaldata" onClick={toggleMenu}>Personal Data</Nav.Link>
                  {user.is_admin && (
                    <Nav.Link href="/adminpage" onClick={toggleMenu}>Admin</Nav.Link>
                  )}
                  <Nav.Link onClick={() => { handleLogout(); toggleMenu(); }}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link href="/login" className='login' onClick={toggleMenu}>
                  Log in
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>

        {/* Menu normal para telas grandes */}
        <div className="d-none d-lg-flex w-100">
          <Nav className="me-auto centerNavBar justifyContentBetween">
            <Nav.Link href="/" className='navbarItem mx-2'>Home</Nav.Link>
            <Nav.Link href="/ourpets" className='navbarItem mx-2'>Our Pets</Nav.Link>
            <Nav.Link href="/aboutus" className='navbarItem mx-2'>About Us</Nav.Link>
            <Nav.Link href="/successstories" className='navbarItem mx-2'>Success Stories</Nav.Link>
          </Nav>

          <Nav className='navbarRight'>
            {user ? (
              <NavDropdown title={<i className="fa-solid fa-user me-3" />} id="user-nav-dropdown" align="end">
                <NavDropdown.Item href="/userprofile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/personaldata">Personal Data</NavDropdown.Item>
                {user.is_admin && (
                  <NavDropdown.Item href="/adminpage">Admin</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login" className='login'>
                Log in
              </Nav.Link>
            )}
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
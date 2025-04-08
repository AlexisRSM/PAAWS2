import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Dropdown, DropdownButton } from 'react-bootstrap';
//Added by RM
import { useAPI } from '../pages/Context/Context';
import { useNavigate } from 'react-router-dom';
import logo from '../images/PAAWS_transparentBG.png';


let userIcon = <i className="fa-solid fa-user me-3" />;

function NavigationBar() {
  const { logoutUser, user } = useAPI(); // Get logout function and user information from context
  const navigate = useNavigate(); // Hook for redirection
  //kiling bugs
  console.log(user)
  const handleLogout = async () => {
    try {
      await logoutUser(); // Perform logout
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar NavigationBar p-0" sticky="top">
      <Container fluid className="navbarContainer">
        <img src={logo} alt="PAAWS" className='PAAWSLogo' />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
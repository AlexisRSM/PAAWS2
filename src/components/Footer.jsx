// should include logo (?), possibly socials, FAQ, contact form, maybe languages(?)

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar collapseOnSelect expand="lg" className="footer mt-5" >
      <Container fluid>
        {/* <Image src="src/images/PAAWS footer image.png" alt='mountain range with trees at the foreground' className='footerImg' fluid />; */}
          <Nav className="me-auto footerItem ps-2">
            <Nav.Link>© All pawprints reserved by Alexis Mendes and Bárbara Ferreira</Nav.Link>
            {/* <Nav.Link href="/FAQ">FAQ</Nav.Link> */}
          </Nav>
      </Container>
    </Navbar>
  );
}

export default Footer;
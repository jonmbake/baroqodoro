import logo from '../logo.svg';
import Navbar from 'react-bootstrap/Navbar';

const NavbarExp = () => {
  return (
    <Navbar bg="dark" variant="dark" role="navigation">
      <Navbar.Brand href="/"><img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}Baroqodoro</Navbar.Brand>
    </Navbar>
  );
}

export default NavbarExp;
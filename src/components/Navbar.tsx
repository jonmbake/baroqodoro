import { forwardRef } from 'react';
import logo from '../logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { PersonCircle } from 'react-bootstrap-icons'
import { DropdownToggleProps } from 'react-bootstrap/esm/DropdownToggle';

const CustomToggle = forwardRef(({ children, onClick }: DropdownToggleProps, ref: any) => (
  <a href="#" ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick && onClick(e);
    }}
  >
    {children}
  </a>
));

const NavbarExp = () => {
  return (
    <Navbar bg="dark" variant="dark" role="navigation" className="justify-content-between">
      <Navbar.Brand href="/"><img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}Baroqodoro</Navbar.Brand>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
        < PersonCircle  className="text-white" height="1.5em" width="1.5em"/>
        </Dropdown.Toggle>

        <Dropdown.Menu align="right">
          <Dropdown.Item href="/log">Log</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
}

export default NavbarExp;
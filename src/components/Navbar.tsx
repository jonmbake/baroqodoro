import { forwardRef } from 'react';
import Circle from 'react-circle';
import logo from '../logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { DropdownToggleProps } from 'react-bootstrap/esm/DropdownToggle';
import { HistoryItem, Settings } from '../App';
import { calculateGoalCompletionPercentage } from '../pages/History';

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

interface Props {
  settings: Settings,
  history: Array<HistoryItem>
}

const NavbarExp = ({history, settings}: Props) => {
  return (
    <Navbar bg="dark" variant="dark" role="navigation" className="justify-content-between">
      <Navbar.Brand href="/"><img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}Baroqodoro</Navbar.Brand>
      <Nav className="mr-auto">
      <Nav.Link href="/#/about">About</Nav.Link>
    </Nav>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
          <Circle progress={ calculateGoalCompletionPercentage(settings.dailyGoal, history) } size="30" lineWidth="50" progressColor="#28a745" showPercentage={ false } />
        </Dropdown.Toggle>
        <Dropdown.Menu align="right">
          <Dropdown.Item href="/#/history">History</Dropdown.Item>
          <Dropdown.Item href="/#/settings">Settings</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
}

export default NavbarExp;
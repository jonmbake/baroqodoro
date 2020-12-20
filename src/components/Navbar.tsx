import { forwardRef } from 'react';
import Circle from 'react-circle';
import logo from '../logo.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { DropdownToggleProps } from 'react-bootstrap/esm/DropdownToggle';
import { HistoryItem, Settings } from '../App';

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

  const completedToday = history.filter(hi => {
    const today = new Date().toLocaleDateString();
    return hi.completed.includes(today);
  }).length;

  const goalProgress = completedToday > settings.dailyGoal ? 100 : ((completedToday / settings.dailyGoal) * 100);
  return (
    <Navbar bg="dark" variant="dark" role="navigation" className="justify-content-between">
      <Navbar.Brand href="/"><img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}Baroqodoro</Navbar.Brand>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
          <Circle progress={ goalProgress } size="30" lineWidth="50" progressColor="#28a745" showPercentage={ false } />
        </Dropdown.Toggle>
        <Dropdown.Menu align="right">
          <Dropdown.Item href="/log">Log</Dropdown.Item>
          <Dropdown.Item href="/settings">Settings</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
}

export default NavbarExp;
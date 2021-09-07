import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
} from 'reactstrap';

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  return (
    <div>
      <Navbar color='faded' light expand='md'>
        <NavbarBrand href='/'>Workout Log</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} className='navbar'>
          <Nav className='ml-auto navbar'>
            <NavItem>
              <Button onClick={props.clickLogout}>Logout</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Sitebar;

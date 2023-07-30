import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./NewNavbarStyle.css"
import logo from './Logo.png'
import { AppContext } from '../../App';
import { useContext } from 'react';
import NewShoppingCart from '../Shopping cart component/NewShoppingCart';

export default function NewNavbar() {

    // const path = window.location.pathname;
    const {userLogin, setUserLogin, nav, username, setSearch} = useContext(AppContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg='dark' style={{position: 'sticky', top:'0'}}>
      <Container fluid> 
        <Navbar.Brand>
            <img src={logo} alt='Logo' style={{height: '2rem', cursor: 'pointer'}} onClick={()=>{nav('/')}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-auto" onSubmit={(e)=>{e.preventDefault();nav('/search')}}>
            <Form.Control style={{marginLeft: '50rem'}}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{e.preventDefault();setSearch(e.target.value)}}
            />
          </Form>
          <Button variant="outline-success" onClick={(e) => e.preventDefault()}>Search</Button>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
        <NewShoppingCart/>
        </Nav>
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <NavDropdown title={<p style={{color: 'white', display: 'inline'}}>
              {userLogin ? username : 'Welcome'}
            </p>} 
            id="navbarScrollingDropdown" align='end'>
            {userLogin ?<>
              <NavDropdown.Item >My profile</NavDropdown.Item>
              <NavDropdown.Item >Reset password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item style={{color: 'red'}}
              onClick={()=>{
                localStorage.removeItem("token");
                setUserLogin(false);
                nav('/home')}}
              >Logout</NavDropdown.Item></>
              : 
              <>
              <NavDropdown.Item onClick={()=>{nav('/login')}}>
                Login
              </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{nav('/signup')}}>
                Signup
              </NavDropdown.Item>
              </>}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
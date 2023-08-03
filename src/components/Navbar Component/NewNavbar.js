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
import axios from 'axios';

export default function NewNavbar() {

    // const path = window.location.pathname;
    const {userLogin, setUserLogin, nav, username, setSearch,
       API_URL, search, setItems, setDataSize, setUsername} = useContext(AppContext)

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg='dark' style={{position: 'sticky', top:'0', zIndex: '1'}}>
      <Container fluid> 
        <Navbar.Brand>
            <img src={logo} alt='Logo' style={{height: '2rem', cursor: 'pointer'}} onClick={()=>{nav('/')}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link onClick={()=>{nav('/items')}} style={{color: 'white'}}>Browse</Nav.Link>
          </Nav>
          <Form className="d-flex ms-auto" onSubmit={async (e)=>{e.preventDefault();
              try{
                const response = await axios.post(`${API_URL}/item-search/0/10`,
                {headers: {'content-type': 'application/json'},
                param: search
              }
                )
                console.assert(response.status === 200)
                setItems([...response.data.lst])
                setDataSize(response.data.size)
              }
              catch(error){
                console.log('ERROR:', error);
              }
            nav('/search')}}>
            <Form.Control style={{marginLeft: '45rem'}}
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>{e.preventDefault();setSearch(e.target.value)}} value={search}
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
              {userLogin ? '@'+username : 'Login/Signup'}
            </p>} 
            id="navbarScrollingDropdown" align='end'>
            {userLogin ?<>
              <NavDropdown.Item onClick={()=>{nav('/profile')}}>
                My profile
                </NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{nav('/reset-password')}}>
                Reset password
                </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item style={{color: 'red'}}
              onClick={()=>{
                localStorage.removeItem("token");
                setUserLogin(false);
                setUsername('')
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
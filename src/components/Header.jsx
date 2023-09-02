import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../Store/authApi";
import { destroyUserInfo } from "../Store/authSlice";
import { toast } from "react-toastify";

function Header() {
  const UserMenu = (
    <img
      src="/default.png"
      alt="UserName profile image"
      style={{ width: "40px", borderRadius: "50%" }}
    />
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [func_logout] = useLogoutMutation();

  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const res = await func_logout();

    console.log("response form logout", res);

    if (res.error) {
      toast.error(res.error.data.message);
      if (res.error.status !== 401) {
        return;
      }
    }

    dispatch(destroyUserInfo());
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo.png"
              alt="Project Logo"
              style={{ maxHeight: "30px" }}
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && token ? (
              <>
                <Nav.Link to="/tasks" as={Link}>
                  Tasks
                </Nav.Link>
                <NavDropdown title={UserMenu} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link to="/login" as={Link}>
                  Sign In
                </Nav.Link>
                <Nav.Link to="/Register" as={Link}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

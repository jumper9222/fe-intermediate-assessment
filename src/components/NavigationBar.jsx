import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../features/authentication/authSlice";

export default function NavigationBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.auth.token);
    function logoutHandler() {
        dispatch(logout())
        navigate('/')
    }

    return (
        <>
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">Garden Tasks</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token && (
                                <>
                                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                                    <Nav.Link href="/add">Add Task</Nav.Link>
                                </>
                            )}
                        </Nav>
                        {token && <Button variant="danger" onClick={logoutHandler}>Logout</Button>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    )
}
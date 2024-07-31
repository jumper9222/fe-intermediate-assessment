import { useEffect, useState } from "react";
import { Button, Container, Modal, Form, FloatingLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../features/authentication/authSlice";

export default function Home() {
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignupModal, setShowSignupModal] = useState(false)
    const navigate = useNavigate()

    function toggleLoginModal() {
        setShowLoginModal(showLoginModal === false ? true : false)
    }

    function toggleSignupModal() {
        setShowSignupModal(showSignupModal === false ? true : false)
    }

    return (
        <Container>
            <h1 className="my-5">Welcome to your GARDENING todo app</h1>
            <Button className="me-3" onClick={toggleLoginModal}>Login</Button>
            <Button onClick={toggleSignupModal}>Sign Up</Button>
            {showLoginModal && (
                <LoginModal show={showLoginModal} handleClose={toggleLoginModal} navigate={navigate} />
            )}
            {showSignupModal && (
                <SignUpModal show={showSignupModal} handleClose={toggleSignupModal} navigate={navigate} />
            )}
        </Container>
    )
}

function LoginModal({ show, handleClose, navigate }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    function loginHandler(e) {
        e.preventDefault();
        dispatch(login({ username, password }));
        navigate('/dashboard')
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header>
                <h2>Login to your account</h2>
            </Modal.Header>
            <Form onSubmit={loginHandler}>
                <Modal.Body>
                    <FloatingLabel controlId="usernameInput" label="Username">
                        <Form.Control
                            className="mb-3"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="passwordInput" label="Password">
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Login</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

function SignUpModal({ show, handleClose, navigate }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')
    const [usernameExists, setUsernameExists] = useState(false)
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false)

    const dispatch = useDispatch()

    const users = useSelector((state) => {
        return state.auth.users
    });

    useEffect(() => {
        if (users.findIndex(user => user.username === username) === -1) {
            setUsernameExists(false)
            console.log(`username doesn't exist`)
        }
        if (users.findIndex(user => user.username === username) > -1) {
            setUsernameExists(true)
            console.log(`username exists`)
        }
    }, [username, users])

    useEffect(() => {
        if (password !== confirmPassword) {
            setPasswordsDontMatch(true)
            console.log(`passwords don't match`)
        } else {
            setPasswordsDontMatch(false)
            console.log(`passwords match`)
        }
    }, [password, confirmPassword])

    function signUpHandler(e) {
        e.preventDefault();
        if (users.findIndex(user => user.username === username) === -1 && password === confirmPassword) {
            dispatch(signUp({ username, password }));
            navigate('/dashboard')
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
        >
            <Modal.Header>
                <h2>Create an account</h2>
            </Modal.Header>
            <Form onSubmit={signUpHandler}>
                <Modal.Body>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    {usernameExists && <Form.Text className="mb-3">Username exists</Form.Text>}
                    <br />
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        className="mb-1"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                    />
                    {passwordsDontMatch && <Form.Text>Passwords dont match</Form.Text>}
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Sign up</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

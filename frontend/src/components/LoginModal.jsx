import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const LoginModal = ({ show, handleClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const handleToggle = () => setIsLogin(!isLogin);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isLogin ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Name only for signup */}
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" type="submit">
              {isLogin ? "Login" : "Sign Up"}
            </Button>

            <Button variant="link" onClick={handleToggle}>
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Login"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;

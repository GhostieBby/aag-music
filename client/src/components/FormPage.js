/* eslint-disable react/no-unescaped-entities */
import { Form, Container, Nav, Navbar, Row, Col, Button } from 'react-bootstrap'


export default function FormPage() {

  return (
    <div>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <Nav className="mr-auto">
              <Nav.Link href="login">Login</Nav.Link>
              <Nav.Link href="users">Users</Nav.Link>
              <Nav.Link href="reviews">Reviews</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <div className="entry">
        <Container>
          <Row>
            <Col md={6}>
              <div className="text">
                <h1>AAG Music</h1>
                <h3>Where artists help each other get heard.</h3>
              </div>
              <Form>
                <Form.Group controlId="username">
                  <Form.Control type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
                <Button variant="secondary" type="button">Register</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
      <footer>
        <Navbar bg="light" expand="lg">
          <Container>
            <Nav className="ml-auto">
              <Nav.Link href="about.html">About</Nav.Link>
              <Nav.Link href="contact.html">Contact</Nav.Link>
              <Nav.Link href="privacy.html">Privacy Policy (If we had one)</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </footer>
    </div>
  )
}

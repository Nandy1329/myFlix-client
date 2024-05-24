import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.scss';

export const Footer = () => {
    return (
        <footer>
        <Container>
            <Row>
            <Col>
                <p>&copy; 2024 MyFlix</p>
            </Col>
            </Row>
        </Container>
        </footer>
    );
    }
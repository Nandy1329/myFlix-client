import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './footer.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col>
                        <p className="footer-text">&copy; 2024 MyFlix</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

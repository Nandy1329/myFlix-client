import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MainView } from './components/main-view/main-view';
import { Container } from 'react-bootstrap';
import './index.scss'; 

const MyMovies = () => {
    return (
        <Container>
            <BrowserRouter>
                <MainView />
            </BrowserRouter>
        </Container>
    );
}

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyMovies />);
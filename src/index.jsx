import React from 'react';
import { createRoot } from 'react-dom';
import MyFlixApp from './MyFlixApp';

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApp />);
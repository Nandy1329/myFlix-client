import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.scss";

const MyFlixApp = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);

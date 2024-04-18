import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view.jsx';

import "./index.scss";
import { Container } from 'react-bootstrap';

const MyFlixApp = () => {
  const token = localStorage.getItem('token'); 

  return  (
    <Container>
      <MainView/>
    </Container>
  );


const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApp />);
}
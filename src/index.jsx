import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const MyFlixApp = () => {
  return <main-view />;
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<MyFlixApp />);

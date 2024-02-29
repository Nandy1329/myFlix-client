import { MainView } from "./components/main-view/main-view.jsx";

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

const MyFlixApp = () => {
  return (
    <container>
      <MainView />
    </container>
  );
};

// Find the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<MyFlixApp />);
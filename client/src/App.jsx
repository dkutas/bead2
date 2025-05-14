import "./App.css";
import NavBar from "./features/NavBar/Navbar";
import { Main } from "./features/Main/Main";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <NavBar />
      <Main />
    </>
  );
}

export default App;

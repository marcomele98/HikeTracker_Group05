import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import LogicContainer from './LogicContainer';
import HikeForm from "./HikeForm";

function App() {
  return (
    <Router>
      <LogicContainer></LogicContainer>
      <HikeForm></HikeForm>
    </Router>
  );
}

export default App;




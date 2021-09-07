import "./App.css";
import { Home } from "./Components/Pages/Home";
import { About } from "./Components/Pages/About";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about/:type/:fabr/:id" component={About} />
      </Switch>
    </Router>
  );
}

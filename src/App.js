import { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/coins/:id">
          <CoinPage />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;

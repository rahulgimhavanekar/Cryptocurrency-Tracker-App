import Layout from "./components/Layout/Layout";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoinPage from "./pages/CoinPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/coins/:id">
          <CoinPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

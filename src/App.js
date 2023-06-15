import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom"
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ThankYouPage from "./pages/ThankYouPage";

const App = () => {
  return (
    <>
            <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/pizza" component={ProductPage} />
          <Route exact path="/siparis-onayi" component={ThankYouPage} />
        </Switch>
    </>
  );
};
export default App;
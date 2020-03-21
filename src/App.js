import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Shop from "./components/Shop.js/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import NotFound from "./components/Notfound/NotFound";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Login from "./components/Login/Login";
import { createContext } from "react";
import { AuthContextProvider, PrivateRoute } from "./components/Login/useAuth";
import Shipment from "./Shipment/Shipment";

function App() {
  const user = { name: "GEDU MIA" };
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/Shop">
              <Shop></Shop>
            </Route>
            <Route path="/Review">
              <Review></Review>
            </Route>
            <Route path="/Inventory">
              <Inventory></Inventory>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>
            <Route exact path="/">
              <Shop></Shop>
            </Route>
            <Route path="/product/:productkey">
              <ProductDetail></ProductDetail>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;

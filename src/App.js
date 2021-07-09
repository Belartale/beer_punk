import React from "react";
import "./App.css";

import "./../node_modules/normalize.css";

import { BrowserRouter, Route } from "react-router-dom";
import { Box, AppBar, Container, makeStyles, Button } from "@material-ui/core";

import { NavLink } from "react-router-dom";

import CardBeer from "./components/CardBeer";
import CardPage from "./components/CardPage/CardPage";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  navBarLink: {
    textDecoration: "none",
    marginRight: 30,
    color: "black",
    fontSize: 20,
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Box>
        <AppBar position="static" className={classes.root}>
          <nav>
            <NavLink
              to="/tabs/beers-with-pizza/"
              className={classes.navBarLink}
            >
              <Button variant="outlined">Beers that pair with pizza</Button>
            </NavLink>
            <NavLink
              to="/tabs/beers-with-steak/"
              className={classes.navBarLink}
            >
              <Button variant="outlined">Beers that pair with steak</Button>
            </NavLink>
            <NavLink to="/tabs/all-beers/" className={classes.navBarLink}>
              <Button variant="outlined">All available beers</Button>
            </NavLink>
          </nav>
        </AppBar>
        <Container>
          <Route
            path="/tabs/beers-with-pizza"
            render={() => <CardBeer with={"pizza"} />}
          />
          <Route
            path="/tabs/beers-with-steak"
            render={() => <CardBeer with={"steak"} />}
          />
          <Route
            path="/tabs/all-beers"
            render={() => <CardBeer with={"all-beers"} />}
          />
          <Route path="/beer/:id?" render={() => <CardPage />} />
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;

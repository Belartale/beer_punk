import React from "react";
import "./App.css";

import "./../node_modules/normalize.css";

import { BrowserRouter, Route } from "react-router-dom";
import {
  Box,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Link,
  Container,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";

import CardBeer from "./components/CardBeer";
import CardPage from "./components/CardPage";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     // flexGrow: 1,
//     // backgroundColor: theme.palette.background.paper,
//   },
// }));

const App = (props) => {
  // const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      <Box>
        {/* <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="beers that pair with pizza" {...a11yProps(0)} />
            <Tab label="beers that pair with steak" {...a11yProps(1)} />
            <Tab label="all available beers" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Route path="/tabs/all-beers/:id?" render={() => <CardBeer />} />
        </TabPanel> */}

        <AppBar position="static">
          <nav>
            <NavLink to="/tabs/beers-with-pizza/">
              beers that pair with pizza............
            </NavLink>
            <NavLink to="/tabs/beers-with-steak/">
              beers that pair with steak............
            </NavLink>
            <NavLink to="/tabs/all-beers/">all available beers</NavLink>
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default App;

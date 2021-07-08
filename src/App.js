import React from "react";
import "./App.css";

import "./../node_modules/normalize.css";

import { BrowserRouter, Route } from "react-router-dom";
import { Box, AppBar, Tabs, Tab, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import CardItem from "./components/CardItem";

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
      <Route
        path="/:id?"
        render={() => {
          return (
            <Box>
              <AppBar position="static">
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
                <CardItem />
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
              {/* <Route path="/" render={() => <MyTabs />} /> */}
            </Box>
          );
        }}
      />
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

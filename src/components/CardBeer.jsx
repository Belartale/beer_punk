import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { connect } from "react-redux";

import { setBeersAC } from "../redux/itemsReducer";

import itemAPI from "../api/api";

import { NavLink, withRouter } from "react-router-dom";

import * as _ from "lodash";

const useStylesCardBeer = makeStyles({
  root: {
    width: 300,
    margin: 10,
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
});

const CardBeer = (props) => {
  const classes = useStylesCardBeer();

  let createCards = props.items.map((card) => (
    <NavLink to={`/beer/${card.id}`} style={{ textDecoration: "none" }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={card.image_url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {card.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {card.abv}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  ));

  return <>{createCards}</>;
};

const useStylesButtonsSortBeers = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    justifyContent: "center",
  },
}));

const ButtonsSortBeers = (props) => {
  const classes = useStylesButtonsSortBeers();

  function sortNameAscending() {
    props.setBeers(_.sortBy(props.data, [(o) => o.name]));
  }
  function sortNameDescending() {
    props.setBeers(_.sortBy(props.data, [(o) => o.name]).reverse());
  }

  function sortABVAscending() {
    props.setBeers(_.sortBy(props.data, [(o) => o.abv]));
  }
  function sortABVDescending() {
    props.setBeers(_.sortBy(props.data, [(o) => o.abv]).reverse());
  }

  return (
    <div className={classes.root}>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
      >
        <Button onClick={sortNameAscending}>name ascending</Button>
        <Button onClick={sortNameDescending}>name descending</Button>
      </ButtonGroup>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
      >
        <Button onClick={sortABVAscending}>abv ascending</Button>
        <Button onClick={sortABVDescending}>abv descending</Button>
      </ButtonGroup>
    </div>
  );
};

class CardBeerAPIComponent extends React.Component {
  componentDidMount() {
    itemAPI.getAllBeers().then((res) => {
      this.props.setBeers(res.data);
    });

    if (this.props.with) {
      itemAPI.getBeersWithWho(this.props.with).then((e) => {
        this.props.setBeers(e.data);
      });
    }
  }

  render() {
    function createCards(params) {
      let arr = [];
      let obj = params.items;

      for (const iterator in obj) {
        arr.push(obj[iterator]);
      }

      return arr;
    }

    return (
      <div>
        <ButtonsSortBeers
          data={this.props.items}
          setBeers={this.props.setBeers}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <CardBeer
            items={createCards({
              items: this.props.items,
            })}
            with={this.props.with}
          />
        </div>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBeers: (items) => {
      dispatch(setBeersAC(items));
    },
  };
};

const CardBeerContainer = connect(
  mapStateProps,
  mapDispatchToProps
)(withRouter(CardBeerAPIComponent));

export default CardBeerContainer;

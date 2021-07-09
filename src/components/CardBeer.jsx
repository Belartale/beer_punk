import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import { setBeersAC } from "../redux/itemsReducer";

import itemAPI from "../api/api";

import { NavLink, withRouter } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardBeer = (props) => {
  const classes = useStyles();

  let createCards = props.items.map((card) => (
    <NavLink to={`/beer/${card.id}`}>
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

class CardBeerAPIComponent extends React.Component {
  componentDidMount() {
    itemAPI.getAllBeers().then((res) => {
      this.props.setBeers(res.data);
    });

    // itemAPI.getAllBeers(null, (data) => {
    //   this.props.setBeers(data);
    // });

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
      <>
        <CardBeer
          items={createCards({
            items: this.props.items,
            with: this.props.with,
          })}
          with={this.props.with}
        />
      </>
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

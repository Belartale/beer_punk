import React from "react";

import { connect } from "react-redux";

import { setOneBeerAC } from "../redux/itemsReducer";

import itemAPI from "../api/api";

import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardPage = (props) => {
  let sss = props.oneItem;

  let result = {};

  for (const key in sss) {
    if (Object.hasOwnProperty.call(sss, key)) {
      const element = sss[key];
      result = element;
    }
  }

  console.log(result);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Box mt={5} mx="auto" className={classes.root}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={result.image_url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          Ca
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

class CardPageAPIComponent extends React.Component {
  componentDidMount() {
    itemAPI.getBeer(this.props.match.params.id).then((res) => {
      this.props.setOneBeer(res.data);
    });
  }

  render() {
    return (
      <>
        <CardPage oneItem={this.props.oneItem} />
      </>
    );
  }
}

const mapStateProps = (state) => {
  return {
    oneItem: state.items.item,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOneBeer: (item) => {
      dispatch(setOneBeerAC(item));
      // let dataToObj = (param) => {
      //   let obj = {};
      //   for (const key in param) {
      //     obj = { ...param[key] };
      //   }
      //   console.log(obj);
      //   return obj;
      // };
      // let result = dataToObj(item);

      // dispatch(setOneBeerAC(result));
    },
  };
};

const CardPageContainer = connect(
  mapStateProps,
  mapDispatchToProps
)(withRouter(CardPageAPIComponent));

export default CardPageContainer;

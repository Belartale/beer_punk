import React from "react";

import { connect } from "react-redux";

import { setOneBeerAC } from "../../redux/itemsReducer";

import TextCollapse from "./TextCollapse";

import itemAPI from "../../api/api";

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
    backgroundSize: "contain",
  },
  cardIndentMY: { marginTop: 10, marginBottom: 10 },
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

  const classes = useStyles();

  // function WithoutTextCollapse(params) {
  //   return;
  // }

  function CheckTextLength(params) {
    // if (params.length > 100) {
    //   return <TextCollapse data={params} />;
    // } else {
    //   return params;
    // }

    if (typeof params === "string") {
      if (params.length > 100) {
        return (
          <TextCollapse data={params} title="Description about this beer" />
        );
      } else {
        return params;
      }
    } else if (typeof params === "object") {
      return <TextCollapse data={params} title="Food pairing with this beer" />;
    }
  }

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
              {result.name}
            </Typography>
            <Typography
              className={classes.cardIndentMY}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {result.tagline}
            </Typography>
            <Typography variant="body3" color="textSecondary" component="p">
              {result.abv}
            </Typography>
            <Typography
              className={classes.cardIndentMY}
              variant="body4"
              color="textSecondary"
              component="p"
            >
              {CheckTextLength(result.description)}
              {/* <TextCollapse data={result.description} /> */}
              {/* {result.description} */}
            </Typography>
            <Typography variant="body5" color="textSecondary" component="p">
              {/* {result.food_pairing} */}
              {CheckTextLength(result.food_pairing)}
              {/* {result.food_pairing.map((e) => (
                <p>{e}</p>
              ))} */}
            </Typography>
          </CardContent>
        </CardActionArea>
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
    if (this.props.oneItem !== undefined) {
      return (
        <>
          <CardPage oneItem={this.props.oneItem} />
        </>
      );
    } else {
      return <p>I didn't find data about this beer</p>;
    }
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

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

import { setItemsAC } from "../redux/itemsReducer";

import itemAPI from "../api/api";

import { withRouter } from "react-router-dom";
// import store from "../redux/reduxStore";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const CardItem = (props) => {
  const classes = useStyles();

  const beerImg =
    "data:image/jpeg;base64,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";

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={beerImg}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            name
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ABV
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const CardItemAPIComponent = async (props) => {
  await itemAPI.getAllItems().then((res) => {
    this.props.setItems(res);
  });

  await console.log(this.props.items);
  return (
    <div>
      {this.props.items.map((e) => (
        <CardItem items={e} />
      ))}
    </div>
  );
};
// class CardItemAPIComponent extends React.Component {
//   componentDidMount() {
//     itemAPI.getAllItems().then((res) => {
//       this.props.setItems(res);
//       // console.log(res.data);
//     });

//     // itemAPI.getAllItems(null, (data) => {
//     //   this.props.setItems(data);
//     // });
//   }

//   // render() {
//   //   console.log(this.props);
//   //   return <CardItem />;
//   // }

//   render() {
//     console.log(this.props.items);
//     return (
//       <div>
//         {this.props.items.map((e) => (
//           <CardItem items={e} />
//         ))}
//       </div>
//     );
//   }
// }

const mapStateProps = (state) => {
  return {
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setItems: (items) => {
      dispatch(setItemsAC(items));
    },
  };
};

const CardItemContainer = connect(
  mapStateProps,
  mapDispatchToProps
)(withRouter(CardItemAPIComponent));

export default CardItemContainer;

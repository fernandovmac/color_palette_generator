import React from "react";
import { makeStyles, easing } from "@material-ui/core/styles";
import { motion } from "framer-motion";

const drawerWidth = 240;
const spring = {
  type: "spring",
  damping: 10,
  stiffness: 400,
};

const style = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
  },

  content: {
    minWidth: "720px",
    minHeight: "720px",
    left: "240px",
    position: "absolute",
    marginTop: "300px",
    // backgroundColor: "black",
  },

  dot: {
    minWidth: "18px",
    minHeight: "18px",
    borderRadius: "10px",
    // top: "300px",
    // backgroundColor: "green",
    position: "absolute",
    listStyleType: "none",
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function PlottedCurvesSection(props) {
  const classes = style(props);
  const points = Array.from(Array(10).keys());

  function* range(start, end, step) {
    while (start < end) {
      yield start;
      start += step;
    }
  }

  //t<.5 ? 2*t*t : -1+(4-2*t)*t
  //(--value)*value*value+1 ease out cubic
  //value * value * value ease-in cubic

  const easingCurve = (value) => {
    if (props.selectedCurve === "ease out cubic") {
      var curvedResultOut = (--value * value * value + 1) * -1 * 100;
      return curvedResultOut;
    } else {
      var curvedResultIn = value * value * value * -1 * 100;
      return curvedResultIn;
    }
  };

  const colorCurveRGB = (value) => {
    if (props.selectedCurve === "ease out cubic") {
      var curvedOutColorArray = new Array(3)
        .fill(Math.floor((--value * value * value + 1) * 100))
        .join(" , ");
      return curvedOutColorArray;
    } else {
      var curvedInColorArray = new Array(3)
        .fill(Math.floor(value * value * value * 100))
        .join(" , ");
      return curvedInColorArray;
    }
  };

  const colorCurveLightness = (value) => {
    if (props.selectedCurve === "ease out cubic") {
      var curvedOutColorLightness = Math.floor(
        --value * (value * value) + 1 * 40
      );
      console.log(curvedOutColorLightness);
      return curvedOutColorLightness;
    } else {
      var curvedInColorLightness = Math.floor(value * value * value * 40);
      console.log(curvedInColorLightness);
      return curvedInColorLightness;
    }
  };

  let pointsY = Array.from(range(0, 1, 0.1));

  const pointsX = pointsY.reverse();

  return (
    <div className={classes.content}>
      {pointsX.map((value, index) => (
        <motion.li
          key={value}
          className={classes.dot}
          layoutTransition={spring}
          style={{
            left: value * 100 * 2,
            // backgroundColor: `rgb(${easingCurve(value)}, 0, 0)`,
            // backgroundColor: `rgb(${colorCurveRGB(value)})`,
            backgroundColor: `hsl(${props.initialHUEValue}, ${
              value * 50
            }%, ${colorCurveLightness(value)}%)`,
            // backgroundColor: "hsl(180, 50, 20)",

            top: easingCurve(value),
          }}
        ></motion.li>
      ))}
    </div>
  );
}

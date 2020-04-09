import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import Typography from "@material-ui/core/Typography";
import { easingCurves } from "./CurvesFunctions.js";
import { hslToHex } from "./HSL2HEXConverter.js";
import DotInfoTag from "./DotInfoTag.js";
import { light } from "@material-ui/core/styles/createPalette";

const nodeWidth = 620;
const dotSteps = 10;
const dotSize = 18;
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
    minWidth: `${nodeWidth + dotSize}px`,
    minHeight: "720px",
    left: "240px",
    position: "absolute",
    // marginTop: "200px",
    backgroundColor: "grey",
  },

  dot: {
    minWidth: `${dotSize}px`,
    minHeight: `${dotSize}px`,
    borderRadius: "10px",
    marginTop: "200px",
    position: "absolute",
    listStyleType: "none",
    transition: "background-color 1s ease-in-out .2s",
    transitionDelay: ".7s",
  },

  HEXlabel: {
    position: "absolute",
    fontSize: "10px",
    transition: "top .2s ease-in-out .1s",
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function PlottedCurvesSection(props) {
  const classes = style(props);
  const maxLightness = props.maxLightness;
  const minLightness = props.minLightness;

  //   props.HUEMin + value * (props.HUEMax - props.HUEMin)

  function* range(start, end, step) {
    while (start < end) {
      yield start;
      start += step;
    }
  } // sets the range of the array to generate points

  const dividedDotSteps = 1 / dotSteps; //creates the measure of each step
  let pointsY = Array.from(range(0, 1, dividedDotSteps)); //generates the arrays with the points

  let lightnessRange = maxLightness - minLightness;

  return (
    <div className={classes.content}>
      {/* <div style={{ marginTop: "300px", height: "50px" }}></div> */}
      <DotInfoTag
        pointsY={pointsY}
        selectedCurve={props.selectedCurve}
        nodeWidth={nodeWidth}
        HUEMax={props.HUEMax}
        HUEMin={props.HUEMin}
        hoveredDot={props.hoveredDot}
        lightnessRange={lightnessRange}
        minLightness={minLightness}
      ></DotInfoTag>
      {pointsY.map((value, index) => (
        <motion.li
          key={value}
          id={value}
          className={classes.dot}
          layoutTransition={spring}
          onMouseOver={props.handleHoveredDot}
          onMouseOut={props.handleHoverOutDot}
          style={{
            left: value * nodeWidth,
            backgroundColor: `hsl(${Math.floor(
              props.HUEMin + value * (props.HUEMax - props.HUEMin)
            )}, 100%, ${
              minLightness +
              easingCurves(value, props.selectedCurve, lightnessRange)
            }%)`,
            top:
              easingCurves(value, props.selectedCurve, lightnessRange) * -3.3 +
              200,
          }}
        ></motion.li>
      ))}
    </div>
  );
}

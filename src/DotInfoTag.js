import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { easingCurves } from "./CurvesFunctions.js";
import { hslToHex } from "./HSL2HEXConverter.js";
import { motion } from "framer-motion";

const style = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
  },

  HEXlabel: {
    position: "absolute",
    fontSize: "10px",
    transition: "top .2s ease-in-out .1s",
    color: "blue",
    backgroundColor: "#ffff",
    minWidth: "5%",
    minHeight: "5%",
    borderRadius: "2px",
    opacity: "0.5",

    // "&:hover": {
    //   color: "green",
    // },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const variants = {
  rest: { opacity: 0, scale: 0 },
  hover: { opacity: 1, scale: 1 },
};
// var hoveredDot= props.hoveredDot;

export default function DotInfoTag(props) {
  const classes = style(props);
  return (
    <div>
      {props.pointsY.map((value) => (
        <motion.div
          animate={props.hoveredDot === value ? "hover" : "rest"}
          variants={variants}
          transition={{ duration: 0.5 }}
          initial="rest"
          key={value}
          className={classes.HEXlabel}
          style={{
            left: value * props.nodeWidth,
            top: easingCurves(value, props.selectedCurve) * -1 - 43 + 200,
            // opacity: props.hoveredDot === value ? "1" : "0",
          }}
        >
          <Typography
            style={{
              left: value * props.nodeWidth,
              top: easingCurves(value, props.selectedCurve) * -1 - 43 + 200,
              fontSize: "10px",
            }}
          >
            {`HEX : ${hslToHex(
              props.HUEMin + value * (props.HUEMax - props.HUEMin),
              90,
              easingCurves(value, props.selectedCurve)
            )}`}
          </Typography>
          <Typography
            style={{
              left: value * props.nodeWidth,
              top: easingCurves(value, props.selectedCurve) * -1 - 43 + 200,
              fontSize: "10px",
            }}
          >
            {`HSL : ${
              props.HUEMin + value * (props.HUEMax - props.HUEMin)
            } 90 ${easingCurves(value, props.selectedCurve)}`}
          </Typography>
        </motion.div>
      ))}
    </div>
  );
}

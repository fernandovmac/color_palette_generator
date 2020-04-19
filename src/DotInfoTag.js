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

  infoLabel: {
    position: "absolute",
    fontSize: "10px",
    transition: "top .2s ease-in-out .1s",
    color: "blue",
    backgroundColor: "#ffff",
    minWidth: "5%",
    minHeight: "5%",
    borderRadius: "2px",
    opacity: "1",
    marginTop: "200px",

    // "&:hover": {
    //   color: "green",
    // },
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const variants = {
  rest: { scale: 0 },
  hover: { scale: 1 },
};
const spring = {
  type: "spring",
  damping: 30,
  stiffness: 700,
};

export default function DotInfoTag(props) {
  const classes = style(props);
  return (
    <div>
      {props.pointsY.map((value) => (
        <motion.div
          animate={props.hoveredDot === value ? "hover" : "rest"}
          variants={variants}
          //   transition={{ duration: 0.1 }}
          layoutTransition={spring}
          initial="rest"
          key={value}
          className={classes.infoLabel}
          style={{
            left: value * props.nodeWidth,
            top:
              easingCurves(value, props.selectedCurve, props.lightnessRange) *
                -3.3 +
              200 -
              43,
            // opacity: props.hoveredDot === value ? "1" : "0",
          }}
        >
          <Typography
            style={{
              fontSize: "10px",
            }}
          >
            {`HEX : ${hslToHex(
              props.HUEMin + value * (props.HUEMax - props.HUEMin),
              100,
              props.minLightness +
                easingCurves(value, props.selectedCurve, props.lightnessRange)
            )}`}
          </Typography>
          <Typography
            style={{
              fontSize: "10px",
            }}
          >
            {`HSL : ${Math.floor(
              props.HUEMin + value * (props.HUEMax - props.HUEMin)
            )} 100 ${
              props.minLightness +
              easingCurves(value, props.selectedCurve, props.lightnessRange)
            }`}
          </Typography>
        </motion.div>
      ))}
    </div>
  );
}

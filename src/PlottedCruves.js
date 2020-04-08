import React from "react";
import { makeStyles, easing } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import Typography from "@material-ui/core/Typography";

const nodeWidth = 580;
const dotSteps = 10;
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
    minWidth: `${nodeWidth}px`,
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
      //   console.log(curvedOutColorLightness);
      return curvedOutColorLightness;
    } else {
      var curvedInColorLightness = Math.floor(value * value * value * 100);
      //   console.log(curvedInColorLightness);
      return curvedInColorLightness;
    }
  };

  //Takes degree, percentage, percentage and returns css hex color:

  function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    // console.log(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  hslToHex(280, 90, 90);

  const dividedDotSteps = 1 / dotSteps;
  let pointsY = Array.from(range(0, 1, dividedDotSteps));
  const pointsX = pointsY.reverse();

  return (
    <div className={classes.content}>
      {pointsX.map((value, index) => (
        <motion.li
          key={value}
          className={classes.dot}
          layoutTransition={spring}
          style={{
            left: value * nodeWidth,
            backgroundColor: `hsl(${
              props.HUEMin + value * (props.HUEMax - props.HUEMin)
            }, ${value * 100}%, ${colorCurveLightness(value)}%)`,
            top: easingCurve(value),
          }}
        ></motion.li>
      ))}

      {pointsX.map((value, index) => (
        <Typography
          key={value}
          className={classes.HEXlabel}
          style={{
            left: value * nodeWidth,
            top: easingCurve(value) - 25,
          }}
        >
          {hslToHex(
            props.HUEMin + value * (props.HUEMax - props.HUEMin),
            value * 100,
            colorCurveLightness(value)
          )}
        </Typography>
      ))}
    </div>
  );
}

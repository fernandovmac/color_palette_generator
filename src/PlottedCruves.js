import React from "react";
import { makeStyles, rgbToHex } from "@material-ui/core/styles";

const drawerWidth = 240;

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
    backgroundColor: "black",
  },

  dot: {
    minWidth: "16px",
    minHeight: "18px",
    borderRadius: "8px",
    // top: "300px",
    // backgroundColor: "green",
    position: "absolute",
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

  let pointsY = Array.from(range(0, 1, 0.1));

  console.log(pointsY);
  const pointsX = pointsY.reverse();

  return (
    <div className={classes.content}>
      {pointsX.map((value, index) => (
        <div
          key={value}
          className={classes.dot}
          style={{
            left: value * 100 * 2,
            top: (--value * value * value + 1) * -1 * 100,
            // backgroundColor: `rgb(
            //     ${(--value * value * value + 1) * -1 * 100},
            //     0,
            //   ${value * 100})`,

            backgroundColor: `rgb(0 , ${new Array(2)
              .fill((--value * value * value + 1) * -1 * 100)
              .join(" , ")}`,
          }}
        ></div>
      ))}
    </div>
  );
}

//t<.5 ? 2*t*t : -1+(4-2*t)*t
//(--value)*value*value+1 ease out cubic
//value * value * value ease-in cubic
// t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 ease in-out cubic
//   easeInQuad: t => t*t,
//   easeOutQuad: t => t*(2-t),
//   easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t
//   easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
//   easeInQuart: t => t*t*t*t,
//   easeOutQuart: t => 1-(--t)*t*t*t,
//   easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
//   easeInQuint: t => t*t*t*t*t,
//   easeOutQuint: t => 1+(--t)*t*t*t*t,
//   easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t

// export const easingCurve = (value) => {
//   if (props.selectedCurve === "ease out cubic") {
//     var curvedResultOut = (--value * value * value + 1) * -1 * 100;
//     return curvedResultOut;
//   } else {
//     var curvedResultIn = value * value * value * -1 * 100;
//     return curvedResultIn;
//   }
// };

// const colorCurveRGB = (value) => {
//   switch (props.selectedCurve) {
//     case "ease out cubic":
//       var curvedOutColorArray = new Array(3)
//         .fill(Math.floor((--value * value * value + 1) * 100))
//         .join(" , ");
//       return curvedOutColorArray;
//       break;
//     case "ease in-out cubic":
//     case "ease in cubic":
//       var curvedInColorArray = new Array(3)
//         .fill(Math.floor(value * value * value * 100))
//         .join(" , ");
//       return curvedInColorArray;
//       break;
//   }
// };

export var easingCurves = (value, selectedCurve) => {
  switch (selectedCurve) {
    case "ease out cubic":
      var curvedOutCubic = Math.floor((--value * value * value + 1) * 1 * 80);
      return curvedOutCubic;
      break;

    case "ease in cubic":
      var curvedInCubic = Math.floor(value * value * value * 99);
      return curvedInCubic;
      break;

    case "ease in-out cubic":
      var curvedInOutCubic = Math.floor(
        value < 0.5
          ? 4 * (value * value * value) * 100
          : ((value - 1) * (2 * value - 2) * (2 * value - 2) + 1) * 100
      );
      return curvedInOutCubic;
      break;

    case "ease in quad":
      var curvedInQuad = Math.floor(value * value * 100);
      return curvedInQuad;
      break;

    case "ease out quad":
      var curvedOutQuad = Math.floor(value * (2 - value) * 100);
      return curvedOutQuad;
      break;

    case "ease in-out quad":
      var curvedInOutQuad = Math.floor(
        value < 0.5
          ? 2 * (value * value) * 100
          : (-1 + (4 - 2 * value) * value) * 100
      );
      return curvedInOutQuad;
      break;

    case "ease in quart":
      var curvedInQuart = Math.floor(value * value * value * value * 100);
      return curvedInQuart;
      break;

    case "ease out quart":
      var curvedOutQuart = Math.floor(
        (1 - --value * value * value * value) * 100
      );
      return curvedOutQuart;
      break;
    case "ease in-out quart":
      var curvedInOutQuart = Math.floor(
        value < 0.5
          ? 8 * (value * value * value * value) * 100
          : (1 - 8 * --value * value * value * value) * 100
      );
      return curvedInOutQuart;
      break;

    case "ease in quint":
      var curvedInQuint = Math.floor(
        value * value * value * value * value * 100
      );
      return curvedInQuint;
      break;

    case "ease out quint":
      var curvedOutQuint = Math.floor(
        (1 + --value * value * value * value * value) * 100
      );
      return curvedOutQuint;
      break;
    case "ease in-out quint":
      var curvedInOutQuint = Math.floor(
        value < 0.5
          ? 16 * value * value * value * value * value * 100
          : (1 + 16 * --value * value * value * value * value) * 100
      );
      return curvedInOutQuint;
      break;
  }
};

import "./App.css";
import React, { Component } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PlottedCurvesSection from "./PlottedCruves.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Slider from "@material-ui/core/Slider";

const drawerWidth = 240;

const style = (theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    fontFamily: "Noto Sans JP",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurve: "ease out cubic",
      initialHUE: 180,
    };
    this.handleCurveChange = this.handleCurveChange.bind(this);
    this.handleImageInitialHUEChange = this.handleImageInitialHUEChange.bind(
      this
    );
    this.HUESliderValueText = this.HUESliderValueText.bind(this);
  }

  HUESliderValueText = (value) => {
    return `${value}`;
  };

  handleCurveChange = (event) => {
    this.setState({ selectedCurve: event.target.value });
    console.log(this.state.selectedCurve);
  };

  handleImageInitialHUEChange = (event, newValue) => {
    this.setState({ initialHUE: `${newValue}` });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Plotting curves
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Typography>Hello Drawer Menu</Typography>

          <FormControl variant="outlined" className={classes.formControl}>
            <Slider
              defaultValue={200}
              getAriaValueText={this.HUESliderValueText}
              onChange={this.handleImageInitialHUEChange}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={10}
              min={0}
              max={360}
            />
            <InputLabel
              id="select-font-family"
              style={{ marginBottom: "100px" }}
            >
              Curve type
            </InputLabel>
            <Select
              labelId="outlined-select"
              id="select-font-family"
              value={this.state.selectedCurve}
              onChange={this.handleCurveChange}
              style={{ fontWeight: 100, fontSize: "12px", margin: "0px" }}
            >
              <MenuItem
                value="ease out cubic"
                id="ease out cubic"
                style={{
                  fontWeight: 100,
                  fontSize: "12px",
                  margin: "0px",
                }}
              >
                Ease out cubic
              </MenuItem>
              <MenuItem
                value="ease in cubic"
                id="ease in cubic"
                style={{
                  fontWeight: 100,
                  fontSize: "12px",
                  margin: "0px",
                }}
              >
                ease in cubic
              </MenuItem>
            </Select>
          </FormControl>
        </Drawer>
        <PlottedCurvesSection
          selectedCurve={this.state.selectedCurve}
          initialHUEValue={this.state.initialHUE}
        ></PlottedCurvesSection>
      </div>
    );
  }
}

export default withStyles(style)(App);

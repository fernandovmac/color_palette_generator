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
      minHUE: 100,
      maxHUE: 200,
    };
    this.handleCurveChange = this.handleCurveChange.bind(this);
    this.handleMinHUEChange = this.handleMinHUEChange.bind(this);
    this.handleMaxHUEChange = this.handleMaxHUEChange.bind(this);
    this.HUEMinSliderValueText = this.HUEMinSliderValueText.bind(this);
    this.HUEMaxSliderValueText = this.HUEMaxSliderValueText.bind(this);
  }

  HUEMinSliderValueText = (value) => {
    return `${value}`;
  };

  HUEMaxSliderValueText = (value) => {
    return `${value}`;
  };

  handleCurveChange = (event) => {
    this.setState({ selectedCurve: event.target.value });
    console.log(this.state.selectedCurve);
  };

  handleMinHUEChange = (event, newValue) => {
    this.setState({ minHUE: `${newValue}` });
  };

  handleMaxHUEChange = (event, newValue) => {
    this.setState({ maxHUE: `${newValue}` });
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
          <Typography>Min HUE</Typography>
          <Slider
            defaultValue={100}
            getAriaValueText={this.HUEMinSliderValueText}
            onChange={this.handleMinHUEChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={360}
          />
          <Typography>Max HUE</Typography>
          <Slider
            defaultValue={200}
            getAriaValueText={this.HUEMaxSliderValueText}
            onChange={this.handleMaxHUEChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={360}
          />

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel
              id="select-curve-type"
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
          HUEMax={this.state.maxHUE}
          HUEMin={this.state.minHUE}
        ></PlottedCurvesSection>
      </div>
    );
  }
}

export default withStyles(style)(App);

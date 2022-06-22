import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Chip,
  Divider,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Box,
} from "@mui/material";
import Bus from "../../admin/pages/Bus/Buses";
import Train from "../../admin/pages/Train/Trains";
import Flight from "../../admin/pages/Flight/Flights";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function ListingPage() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    // <Box sx={{ bgcolor: "background.paper", width: 500 }}>

    <>
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ marginTop: "5%" }}
      >
        <Box
          justifyContent="center"
          alignItems="center"
          sx={{ bgcolor: "background.paper", width: 1500 }}
        >
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
              TabIndicatorProps={{ style: { background: "red" } }}
              style={{ background: "#003580" }}
            >
              <Tab
                label="Bus Detail and Schedules"
                {...a11yProps(0)}
                style={{ fontWeight: "bold" }}
              />
              <Tab
                label="Train Detail and Schedules"
                {...a11yProps(1)}
                style={{ fontWeight: "bold" }}
              />
              <Tab
                label="Flight Detail and Schedules"
                {...a11yProps(2)}
                style={{ fontWeight: "bold" }}
              />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              value={value}
              index={0}
              dir={theme.direction}
              style={{ padding: "none" }}
            >
              <Bus />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Train />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Flight />
            </TabPanel>
          </SwipeableViews>
        </Box>
      </Grid>
    </>
  );
}

import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

const SalesChart = () => {
  const [chartBooking, setChartBooking] = useState(null);
  const [chartUser, setChartUser] = useState(null);
  const [chartLoss, setChartLoss] = useState(null);
  const pathLoc = window.location.pathname.split("/")[2];
  console.log(pathLoc);
  const bookingSeries = [
    {
      name: "Bookings",
      data: chartBooking,
    },
    {
      name: "Losses",
      data: chartLoss,
    },
  ];
  const userSeries = [
    {
      name: "Users",
      data: chartUser,
    },
  ];
  const chartoptions = {
    series: [
      {
        name: "Bookings",
        data: chartBooking,
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
  };
  const getAdminCount = async () => {
    const result = await fetch(`/adminApi/userPerMonth`);
    const getData = await result.json();
    // setDetails({ yearlyLoss: getData.yearlyLoss[0].loss });
    console.log(getData);
    setChartBooking(getData.booking);
    setChartUser(getData.users);
    setChartLoss(getData.loss);
  };
  useEffect(() => {
    getAdminCount();
  }, []);
  return (
    <div className="row">
      {pathLoc === "dashboard" ? (
        <div className="col">
          <Card>
            <CardContent>
              <Typography varient="h5">Sales Summary</Typography>
              <Typography className="text-muted" varient="h6">
                Yearly Sales Report
              </Typography>
              <Chart
                type="area"
                width="100%"
                height="390"
                options={chartoptions.options}
                series={bookingSeries}
              ></Chart>
            </CardContent>
          </Card>
        </div>
      ) : (
        <></>
      )}
      {pathLoc === "userList" || pathLoc === "dashboard" ? (
        <div className="col">
          <Card>
            <CardContent>
              <Typography varient="h5">Users Summary</Typography>
              <Typography className="text-muted" varient="h6">
                Yearly Users Report
              </Typography>
              <Chart
                type="area"
                width="100%"
                height="390"
                options={chartoptions.options}
                series={userSeries}
              ></Chart>
            </CardContent>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SalesChart;

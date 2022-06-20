import { Card, CardContent, Typography } from "@mui/material";
import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

const SalesChart = () => {
  const [chartBooking, setChartBooking] = useState(null);
  const [chartUser, setChartUser] = useState(null);

  //  [
  //       {
  //         name: "Iphone 13",
  //         data: [0, 31, 40, 28, 51, 42, 109, 100],
  //       },
  //       {
  //         name: "Oneplue 9",
  //         data: [0, 11, 32, 45, 32, 34, 52, 41],
  //       },
  //     ],
  const bookingSeries = [
    {
      name: "Bookings",
      data: chartBooking,
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
  };
  useEffect(() => {
    getAdminCount();
  }, []);
  return (
    <div className="row">
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
    </div>
  );
};

export default SalesChart;

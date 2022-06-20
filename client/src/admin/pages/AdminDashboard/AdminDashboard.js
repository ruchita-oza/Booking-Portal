import React, { useEffect, useState } from "react";
import SalesChart from "../../components/SalesChart";
import AdminTable from "../../components/AdminTable";
import TopCards from "../../components/TopCards";
import {
  faWallet,
  faChartLine,
  faUserPlus,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/_style.scss";

function AdminDashboard() {
  const [yearlyLoss, setYearlyLoss] = useState("");
  const [yearlyProfit, setYearlyProfit] = useState("");
  const [yearlyUsers, setYearlyUsers] = useState("");
  const [monthlyProfit, setMonthlyProfit] = useState("");
  useEffect(() => {
    const getAdminCount = async () => {
      const result = await fetch(`/adminApi`);
      const getData = await result.json();
      // setDetails({ yearlyLoss: getData.yearlyLoss[0].loss });
      console.log(getData.yearlyUser[0].users);
      setYearlyLoss(getData.YearlyLoss[0].loss);
      setYearlyProfit(getData.YearlyProfit[0].profit);
      setYearlyUsers(getData.yearlyUser[0].users);
      setMonthlyProfit(getData.monthlySale[0].profit);
    };
    getAdminCount();
  }, []);
  const TopCardsInfo = [
    {
      bg: "border-success text-success",
      title: "Profit",
      subtitle: "Yearly Earning",
      earning: yearlyProfit,
      icon: faChartLine,
    },
    {
      bg: "border-danger text-danger",
      title: "Refunds",
      subtitle: "Refund given",
      earning: yearlyLoss,
      icon: faWallet,
    },
    {
      bg: "border-warning text-warning",
      title: "Yearly users",
      subtitle: "Yearly Users",
      earning: yearlyUsers,
      icon: faUserPlus,
    },
    {
      bg: "border-info text-into",
      title: "Sales",
      subtitle: "Monthly Sales",
      earning: monthlyProfit,
      icon: faCoins,
    },
  ];
  return (
    <div className="admin mt-5">
      <div className="row">
        {TopCardsInfo.map((info) => (
          <div className="col-lg-3 col-sm-6">
            <TopCards
              // bg="border-danger text-danger"
              // title="Refunds"
              // subtitle="Refund given"
              // earning="$1k"
              // icon={faCoins}
              bg={info?.bg}
              title={info.title}
              subtitle={info?.subtitle}
              earning={info?.earning}
              icon={info?.icon}
            />
          </div>
        ))}
      </div>
      <div className="row m-5">
        <div className="col">
          <SalesChart />
        </div>
      </div>
      <div className="row m-5">
        <div className="col-lg-12">
          <AdminTable />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

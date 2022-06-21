import React, { useEffect, useState } from "react";
import TopCards from "../../components/TopCards";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import SalesChart from "../../components/SalesChart";
import UserTable from "../../components/UserTable";
function UserListing() {
  const [yearlyUsers, setYearlyUsers] = useState("");
  useEffect(() => {
    const getAdminCount = async () => {
      const result = await fetch(`/adminApi`);
      const getData = await result.json();
      setYearlyUsers(getData.yearlyUser[0].users);
    };
    getAdminCount();
  }, []);
  const TopCardsInfo = [
    {
      bg: "border-warning text-warning",
      title: "Yearly users",
      subtitle: "Yearly Users",
      earning: yearlyUsers,
      icon: faUserPlus,
    },
  ];

  return (
    <div className="admin row m-5">
      <div className="col-6">
        <div className="row">
          {TopCardsInfo.map((info) => (
            <div className="col-lg-12 col-sm-12">
              <TopCards
                bg={info?.bg}
                title={info.title}
                subtitle={info?.subtitle}
                earning={info?.earning}
                icon={info?.icon}
              />
            </div>
          ))}
        </div>
        <div className="row mt-5">
          <div className="col">
            <SalesChart />
          </div>
        </div>
      </div>
      <div className="col-6">
        <UserTable />
      </div>
    </div>
  );
}

export default UserListing;

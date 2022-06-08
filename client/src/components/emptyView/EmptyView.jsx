import React from "react";
import "./EmptyView.css";
import empty from "../../images/empty.gif";
const EmptyView = () => (
  <div className="emptyView-wrap">
    <img src={empty} alt="" />
  </div>
);

export default EmptyView;

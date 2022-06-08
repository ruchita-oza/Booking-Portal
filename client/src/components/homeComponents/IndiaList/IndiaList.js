import "./IndiaList.css";
import goa from "../../../images/india/goa.png";
import delhi from "../../../images/india/delhi.png";
import Bangalore from "../../../images/india/Bangalore.png";
import Lonavala from "../../../images/india/Lonavala.png";
import mumbai from "../../../images/india/mumbai.png";
const IndiaList = () => {
  return (
    <div className="pList">
      <div className="pListItem">
        <img src={goa} alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Goa</h1>
          {/* <h2>233 hotels</h2> */}
        </div>
      </div>
      <div className="pListItem">
        <img src={mumbai} alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Mumbai</h1>
          {/* <h2>2331 hotels</h2> */}
        </div>
      </div>
      <div className="pListItem">
        <img src={delhi} alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Delhi</h1>
          {/* <h2>2331 hotels</h2> */}
        </div>
      </div>
      <div className="pListItem">
        <img src={Bangalore} alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Bangalore</h1>
          {/* <h2>2331 hotels</h2> */}
        </div>
      </div>
      <div className="pListItem">
        <img src={Lonavala} alt="" className="pListImg" />
        <div className="pListTitles">
          <h1>Lonavala</h1>
          {/* <h2>2331 hotels</h2> */}
        </div>
      </div>
    </div>
  );
};

export default IndiaList;

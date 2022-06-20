// import { Card, CardBody } from "reactstrap";
import { Card, CardContent } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TopCards = (props) => {
  return (
    <Card className="admin">
      <CardContent>
        <div className="d-flex">
          <div
            className={`circle-box lg-box d-inline-block border ${props?.bg}`}
          >
            <FontAwesomeIcon
              icon={props?.icon}
              style={{ zIndex: "200", filter: "opacity(100%)" }}
            />
          </div>
          <div className="ms-3">
            <h3 className="mb-0 font-weight-bold">{props?.earning}</h3>
            <small className="text-muted">{props?.subtitle}</small>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCards;

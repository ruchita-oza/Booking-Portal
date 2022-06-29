import { Card, CardContent, Typography, Table } from "@mui/material";
import user1 from "../assets/images/users/user1.jpg";
import user3 from "../assets/images/users/user3.jpg";
import user5 from "../assets/images/users/user5.jpg";

const tableData = [
  {
    avatar: user1,
    name: "Ruchita Oza",
    email: "ruchita@atliq.com",
    Roles: "Full stack developer",
    active: "done",
  },
  {
    avatar: user5,
    name: "Rikin Chauhan",
    email: "rikin@atliq.com",
    Roles: "Full Stack Developer",
    active: "done",
  },
  {
    avatar: user3,
    name: "Hetvee sakaria",
    email: "Hetvee@atliq.com",
    Roles: "FrontEnd developer",
    active: "done",
  },
];

const AdminTable = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography
            varient="h5"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Admins
          </Typography>
          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>Team Lead</th>
                <th>Roles</th>

                <th>active</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.name}</h6>
                        <span className="text-muted">{tdata.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{tdata.Roles}</td>
                  <td>
                    {tdata.active === "pending" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.active === "holt" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTable;

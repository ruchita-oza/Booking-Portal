/** @format */
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
// import { authenticationService } from "services";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Register(props) {
  const navigate = useNavigate();
  const validate = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password should be at least 5 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Email is Not valid"),
    confPass: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Confirm Password is not same as above"
      )
      .required("Confirm password is required"),
    phone_number: Yup.string()
      .required("phone_number is required")
      .length(10, "enter valid phone_number"),
  });

  const handleRegister = ({
    first_name,
    last_name,
    email,
    password,
    confPass,
    phone_number,
  }) => {
    setTimeout(async () => {
      if (password === confPass) {
        console.log(first_name);
        const res = await fetch("/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            password,
            phone_number,
          }),
        });
        const data = await res.json();
        if (!data) {
          toast.error("something went wrong , Please try again later");
        } else if (res.status === 401) {
          // toast.error("error");
          toast.error(`ERROR : ${res.status}  ${data.message}`);
        } else if (res.status === 200) {
          toast.success("Registration successful");
          navigate("/");
        } else {
          window.alert("unknown error");
          console.log("unknown error");
        }
      }
    }, 500);
  };

  return (
    <div className="container">
      <ToastContainer positive="top-right" autoClose={1500} />
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="row card-body p-4 ">
              <div className="col-lg-3 d-flex align-items-center justify-content-center">
                <h2 className="card-title text-center mb-5 ">
                  <img
                    src="https://i.pinimg.com/originals/02/fc/da/02fcda11cbfb2a84537f9d059b4c81b2.gif"
                    alt="true"
                    height="200px"
                  />
                </h2>
              </div>
              <div className="col-lg-9 ">
                <div>
                  <Formik
                    initialValues={{
                      first_name: "",
                      last_name: "",
                      password: "",
                      email: "",
                      confPass: "",
                      phone_number: "",
                    }}
                    validationSchema={validate}
                    onSubmit={handleRegister}
                  >
                    {({ setFieldValue, values, errors, status, touched }) => (
                      <Form>
                        {/* {" "} */}
                        {/* {console.log(values)} */}
                        <div className="row w-100 mb-3 form-floating ">
                          <label

                            htmlFor="first_name"
                            id="lblFName"
                            className="col-lg-4 col-md-4 col-sm-10"
                          >
                            First Name
                          </label>

                          <Input
                            name="first_name"
                            type="first_name"
                            label="lblFName"
                            className={
                              "col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.first_name && touched.first_name
                                ? " is-invalid"
                                : "")
                            }
                            value={values["first_name"]}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="invalid-feedback form-floating mb-3 "
                          />
                        </div>
                        <div className="row w-100 mb-3 form-floating ">
                          <label
                            htmlFor="last_name"
                            id="lblLName"
                            className="col-lg-4 col-md-4 col-sm-10"
                          >
                            Last Name
                          </label>
                          <Input
                            name="last_name"
                            type="last_name"
                            label="lblLName"
                            className={
                              "col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.last_name && touched.last_name
                                ? " is-invalid"
                                : "")
                            }
                            value={values["last_name"]}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="invalid-feedback form-floating mb-3 "
                          />
                        </div>
                        <div className="row w-100 form-floating  mb-3">
                          <label
                            htmlFor="email"
                            id="lblEmail "
                            className="col-lg-4 col-md-4 col-sm-10"
                          >
                            Email
                          </label>
                          <Input
                            name="email"
                            type="email"
                            label="lblEmail"
                            icon={faEnvelope}
                            className={
                              "col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.email && touched.email
                                ? " is-invalid"
                                : "")
                            }
                            value={values["email"]}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback form-floating mb-3"
                          />
                        </div>
                        <div className="row w-100 form-floating mb-3 ">
                          <label
                            htmlFor="password"
                            id="lblPass"
                            className="col-lg-4 col-md-4 col-sm-10"
                          >
                            Password
                          </label>
                          <Input
                            name="password"
                            type="password"
                            label="lblPass"
                            autocomplete="on"
                            className={
                              " col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                            value={values["password"]}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback form-floating mb-3 "
                          />
                        </div>
                        <div className="row w-100 form-floating mb-3 ">
                          <label
                            htmlFor="confPass"
                            id="confPass"
                            className="col-lg-4 col-md-4 col-sm-10"
                          >
                            Confirm Password
                          </label>
                          <Input
                            name="confPass"
                            type="password"
                            label="confPass"
                            className={
                              " col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.confPass && touched.confPass
                                ? " is-invalid"
                                : "")
                            }
                            value={values["confPass"]}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage
                            name="confPass"
                            component="div"
                            className="invalid-feedback form-floating mb-3 "
                          />
                        </div>
                        <div className="row w-100 mb-3 form-floating ">
                          <label
                            htmlFor="phone_number"
                            id="lblphone_number"
                            className="col-lg-4 col-md-4 col-sm-10"
                          >
                            Phone Number
                          </label>
                          <Input
                            name="phone_number"
                            type="phone_number"
                            label="lblphone_number"
                            className={
                              "col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.first_name && touched.first_name
                                ? " is-invalid"
                                : "")
                            }
                            value={values["phone_number"]}
                            setFieldValue={setFieldValue}
                          />
                          <ErrorMessage
                            name="phone_number"
                            component="div"
                            className="invalid-feedback form-floating mb-3 "
                          />
                        </div>
                        {status && (
                          <div className={"alert alert-danger"}>
                            {status.toString()}
                          </div>
                        )}
                        <div className="d-grid justify-content-center">
                          <Button
                            type="submit"
                            value="Sign up"
                            onClick={() => {}}
                          ></Button>
                          {/* {isSubmitting && (
                            <img
                              alt="load"
                              src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
                            />
                          )} */}
                        </div>
                        <hr className="my-4" />
                        <div className="w-100  ">
                          <div className="d-flex justify-content-center">
                            <div>
                              <h3>One of us ?</h3>
                              <p>Great! Just Login Again</p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center">
                            <Button
                              value="Sign In"
                              type="button"
                              onClick={() => {
                                props.changeVal();
                              }}
                            ></Button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div></div>
  );
}

export default Register;

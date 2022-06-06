/** @format */
import { useNavigate, Link } from "react-router-dom";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.css";
import { toast } from "react-hot-toast";

function Register() {
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

  const handleRegister = (values) => async () => {
    const { first_name, last_name, email, password, confPass, phone_number } =
      values;
    const res = await fetch("/authRoute/register", {
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
    } else if (res.status === 200) {
      toast.success("Registration successful");
      navigate("/auth/login");
    } else {
      console.log(data.success == false);
      if (data.success == false) toast.error(data.message);
      else toast.error("unknown error");
    }
  };

  return (
    <div className="container">
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
                            validationSchema={validate}
                            onClick={handleRegister(values)}
                          ></Button>
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
                            <Link to="/auth/login">
                              <Button value="Sign In" type="submit"></Button>
                            </Link>
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
      </div>
    </div>
  );
}

export default Register;

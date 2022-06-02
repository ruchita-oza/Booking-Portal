/** @format */
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/Input/Input";
import Button from "../../components/button/Button";
// import { authenticationService } from "services";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./register.css";

function Register(props) {
  // function handleRegister(
  // 	{ username, password, confPass, email },
  // 	{ setStatus, setSubmitting },
  // ) {
  // 	if (password === confPass) {
  // 		authenticationService
  // 			.register({ username, email, password })
  // 			.then((e) => {
  // 				props.changeVal();
  // 			})
  // 			.catch((error) => {
  // 				setSubmitting(false);
  // 				setStatus(error.message);
  // 			});
  // 	}
  // }
  return (
        <div className='col-sm-12 col-md-12 col-lg-12 w-100 mx-auto'>
          <div className='card border-0 shadow rounded-3 '>
            <div className='row mt-4 '>
              <div className='col-lg-3 d-flex align-items-center justify-content-center'>
                <h2 className='card-title text-center mb-5 '>
					<img src="https://i.pinimg.com/originals/02/fc/da/02fcda11cbfb2a84537f9d059b4c81b2.gif" alt="true" height="200px"/>
				</h2>
              </div>
              <div className='col-lg-9 col-md-9 col-sm-9 '>
                <div>
                  <Formik
                    initialValues={{
                      firstname: "",
                      lastname: "",
                      password: "",
                      email: "",
                      confPass: "",
                    }}
                    validationSchema={Yup.object().shape({
                      firstname: Yup.string().required("First Name is required"),
                      lastname: Yup.string().required("Last Name is required"),
                      password: Yup.string().required("Password is required"),
                      email: Yup.string()
                        .required("Email is required")
                        .email("Email is Not valid"),
                      confPass: Yup.string()
                        .oneOf(
                          [Yup.ref("password"), null],
                          "Confirm Password is not same as above"
                        )
                        .required("Confirm password is required"),
                    })}
                    // onSubmit={handleRegister}
                  >
                    {({
                      setFieldValue,
                      values,
                      errors,
                      status,
                      touched,
                      isSubmitting,
                    }) => (
                      <Form>
                        <ErrorMessage
                          name='firstname'
                          component='div'
                          className='invalid-feedback form-floating mb-3 '
                        />
                        <div className='row w-100 mb-3 form-floating '>
                          <label
                            htmlFor='firstname'
                            id='lblFName'
                            className='col-lg-4 col-md-5 col-sm-12'>
                            First Name
                          </label>
                          <Input
                            name='firstname'
                            type='firstname'
                            label='lblFName'
                            className={
                              "col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.firstname && touched.firstname
                                ? " is-invalid"
                                : "")
                            }
                            value={values["firstname"]}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <ErrorMessage
                          name='lastname'
                          component='div'
                          className='invalid-feedback form-floating mb-3 '
                        />
                        <div className='row w-100 mb-3 form-floating '>
                          <label
                            htmlFor='lastname'
                            id='lblLName'
                            className='col-lg-4 col-md-4 col-sm-10'>
                            Last Name
                          </label>
                          <Input
                            name='lastname'
                            type='lastname'
                            label='lblLName'
                            className={
                              "col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.lastname && touched.lastname
                                ? " is-invalid"
                                : "")
                            }
                            value={values["lastname"]}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        <ErrorMessage
                          name='email'
                          component='div'
                          className='invalid-feedback form-floating mb-3'
                        />
                        <div className='row w-100 form-floating  mb-3'>
                          <label
                            htmlFor='email'
                            id='lblEmail '
                            className='col-lg-4 col-md-4 col-sm-10'>
                            Email
                          </label>
                          <Input
                            name='email'
                            type='email'
                            label='lblEmail'
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
                        </div>
                        <ErrorMessage
                          name='password'
                          component='div'
                          className='invalid-feedback form-floating mb-3 '
                        />
                        <div className='row w-100 form-floating mb-3 '>
                          <label
                            htmlFor='password'
                            id='lblPass'
                            className='col-lg-4 col-md-4 col-sm-10'>
                            Password
                          </label>
                          <Input
                            name='password'
                            type='password'
                            label='lblPass'
                            className={
                              " col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.password && touched.password
                                ? " is-invalid"
                                : "")
                            }
                            value={values["password"]}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <ErrorMessage
                          name='confPass'
                          component='div'
                          className='invalid-feedback form-floating mb-3 '
                        />
                        <div className='row w-100 form-floating mb-3 '>
                          <label
                            htmlFor='confPass'
                            id='confPass'
                            className='col-lg-4 col-md-4 col-sm-10'>
                            Confirm Password
                          </label>
                          <Input
                            name='confPass'
                            type='password'
                            label='confPass'
                            className={
                              " col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.confPass && touched.confPass
                                ? " is-invalid"
                                : "")
                            }
                            value={values["confPass"]}
                            setFieldValue={setFieldValue}
                          />
                        </div>
						<ErrorMessage
                          name='phoneNumber'
                          component='div'
                          className='invalid-feedback form-floating mb-3 '
                        />
                        <div className='row w-100 mb-3 form-floating '>
                          <label
                            htmlFor='phoneNumber'
                            id='lblphoneNumber'
                            className='col-lg-4 col-md-4 col-sm-10'>
                            Phone Number
                          </label>
                          <Input
                            name='phoneNumber'
                            type='phoneNumber'
                            label='lblphoneNumber'
                            className={
                              "col-lg-7 col-md-7 col-sm-12 form-control" +
                              (errors.firstname && touched.firstname
                                ? " is-invalid"
                                : "")
                            }
                            value={values["phoneNumber"]}
                            setFieldValue={setFieldValue}
                          />
                        </div>

                        {status && (
                          <div className={"alert alert-danger"}>
                            {status.toString()}
                          </div>
                        )}

                        <div className='d-grid justify-content-center'>
                          <Button
                            type='submit'
                            value='Sign up'
                            onClick={() => {}}></Button>
                          {isSubmitting && (
                            <img
                              alt='load'
                              src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='
                            />
                          )}
                        </div>
                        <hr className='my-4' />
                        <div className='w-100  '>
							<div className='d-flex justify-content-center'>
								<div>
                          <h3>One of us ?</h3>
                          <p>Great! Just Login Again</p>
						  </div>
						  </div>
						  <div className='d-flex justify-content-center'>

                          <Button
                            value='Sign In'
                            type='button'
                            onClick={() => {
                              props.changeVal();
                            }}></Button>
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
  );
}

export default Register;

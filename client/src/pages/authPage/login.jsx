/** @format */
import React from "react";
import Button from "../../components/button/Button";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input/Input";
import "./login.css";
import { fetchLoginUserThunkAction } from "../../redux/users/actions";
import { selectUser } from "../../redux/users/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../../components/loader/loader";

function Login(props) {
  const { isLoading, is_admin } = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // let history = useHistory();
  const validate = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "Password must be at least 5 characters"),
  });

  const onSuccess = () => {
    // console.log("on success");
    navigate("/");
  };

  const onError = (error) => {
    // console.log("error occured", error);
  };
  const fetchData = (email, password) => {
    // console.log(email, password);
    dispatch(fetchLoginUserThunkAction(email, password, onSuccess, onError));
  };
  function handleLogin({ email, password }) {
    fetchData(email, password);
    // console.log("at handle login");
    // console.log(email, password);
    // dispatch(fetchLoginUserThunkAction(email, password), navigate("/"));
  }
  // useEffect(() => {
  //   if (loggedInUser) navigate("/");
  // }, [error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <motion.div
          className='container'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <div className='row'>
            <div className='col-sm-12 col-md-12 col-lg-12 mx-auto'>
              <div className='card border-0 shadow my-5'>
                <div className='card-body p-4'>
                  <div className='row'>
                    <div className='col-lg-3 d-flex align-items-center justify-content-center'>
                      <h2 className='card-title text-center mb-5 '>
                        <img
                          src='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8a6668117921675.607f0e97eaa14.gif'
                          alt='true'
                          height='160px'
                        />
                      </h2>
                    </div>
                    <div className='col-lg-9 '>
                      <div>
                        <Formik
                          initialValues={{ email: "", password: "" }}
                          validationSchema={validate}
                          onSubmit={handleLogin}>
                          {({
                            values,
                            setFieldValue,
                            errors,
                            status,
                            touched,
                          }) => (
                            <Form>
                              {/* {console.log(values)} */}
                              <div className='row w-100 mb-3'>
                                <label
                                  htmlFor='email'
                                  id='lblUser'
                                  className='col-lg-4 col-md-4 col-sm-12'>
                                  <div className='text-left'>Email</div>
                                </label>

                                <Input
                                  name='email'
                                  label='lblUser'
                                  className={
                                    "col-lg-7 col-md-7 col-sm-12 form-control" +
                                    (errors.email && touched.email
                                      ? " is-invalid"
                                      : "")
                                  }
                                  value={values["email"]}
                                  setFieldValue={setFieldValue}
                                  // onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className='row'>
                                  <div className='invalid-feedback col-lg-10 col-md-10 col-sm-12 d-flex justify-content-around'>
                                    <ErrorMessage
                                      name='email'
                                      component='div'
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className='row w-100 mb-3 '>
                                <label
                                  htmlFor='password'
                                  id='lblPass'
                                  className='col-lg-4 col-md-4 col-sm-12 '>
                                  <div className='text-left'>Password</div>
                                </label>

                                <Input
                                  name='password'
                                  type='password'
                                  label='lblPass'
                                  className={
                                    "col-mg-7 col-md-7 col-sm-12 form-control" +
                                    (errors.password && touched.password
                                      ? " is-invalid"
                                      : "")
                                  }
                                  value={values["password"]}
                                  // onChange={(e) => setPassword(e.target.value)}
                                  setFieldValue={setFieldValue}
                                />
                                <div className='row'>
                                  <div className='invalid-feedback px-1 form-floating col-lg-10 col-md-11 col-sm-12 d-flex justify-content-around'>
                                    <ErrorMessage
                                      name='password'
                                      component='div'
                                    />
                                  </div>
                                </div>
                              </div>
                              {status && (
                                <div className={"alert alert-danger"}>
                                  {status.toString()}
                                </div>
                              )}
                              <div className='d-flex w-100 justify-content-center'>
                                <Button
                                  type='submit'
                                  value='Login'
                                  onClick={() => {}}
                                />
                              </div>
                              <div>
                                <button
                                  type='button'
                                  className='btn btn-link d-flex w-100 justify-content-center'>
                                  Forgot Password?
                                </button>
                              </div>
                              {/* <hr className='my-4' /> */}
                              <div className='w-100 content '>
                                <div className='d-flex justify-content-center'>
                                  <div>
                                    <h3>New here ?</h3>
                                    <p>Please Sign Up to our website</p>
                                  </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                  <Button
                                    value='Sign Up'
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
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Login;

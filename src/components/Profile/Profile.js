import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link, Route } from "react-router-dom/cjs/react-router-dom.min";

import { authActions } from "../../store/authReducer/authSlice";
import { themeActions } from "../../store/themeReducer/themeSlice";

import Expense from "../Expense/Expense";

const Profile = () => {
  const dispatch = useDispatch();
  const { usertoken } = useSelector((state) => state.auth);
  const { showpro } = useSelector((state) => state.expenses);
  const {isPro,darktheme}=useSelector(state=>state.theme)
  const [updateform, setupdateform] = useState(false);
  const history = useHistory();
  const [userdata, setuserdata] = useState({
    displayname: "",
    email: "",
    photourl: "",
    emailverified: false,
  });

  const darkclass=darktheme?'darkmode':'';

  const newname = useRef(null);
  const newprofileurl = useRef(null);
  const openupdateprofile = () => {
    setupdateform(true);
    history.push("/profile");
  };
  const closeupdateprofile = () => {
    setupdateform(false);
  };

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY";

  // const token = localStorage.getItem("usertoken");

  useEffect(() => {
    const getuserdata = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            idToken: usertoken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            console.log("got user data ", data);
            const currentuserdata = {
              displayname: data.displayName,
              email: data.email,
              photourl: data.photoUrl,
              emailverified: data.emailVerified,
            };
            setuserdata(currentuserdata);
          }
        } else {
          const data = await res.json();
          if (data && data.error) {
            console.log("got error");
            throw new Error(data.error);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getuserdata();
  }, [usertoken]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewname = newname.current.value;
    const photourl = newprofileurl.current.value;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: usertoken,
        displayName: enteredNewname,
        photoUrl: photourl,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) window.alert("Profile updated");
      })
      .catch((err) => console.log(err));
  };

  const sendverifyhandler = async () => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY";
    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: usertoken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data) {
          console.log("sent successfully ", data);
        }
      } else {
        const data = await res.json();
        if (data && data.error) {
          console.log("got error ", data.error);
          throw new Error(data.error);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logouthandler = () => {
    if (window.confirm("Want to Log Out ?")) {
      dispatch(authActions.logout());
      // window.localStorage.removeItem('usertoken')
      // window.localStorage.removeItem('userid')
      history.replace("/auth");
    }
  };

  const prounclockhandler=()=>{
    dispatch(themeActions.setpro())
  }
  const themeToggler=()=>{
    dispatch(themeActions.toggletheme())
  }

  return (
    <div className={"w-100 d-flex flex-column align-items-center bg-light "+darkclass}>
      <div className="border p-3 d-flex flex-column justify-content-between align-items-center w-100 bg-white flex-lg-row">
        <span className="fs-4 mb-3 mb-lg-0">
          Welcome to Expense Tracker !!!
        </span>
        <span className="fs-5 mb-3 mb-lg-0">
          <Link to="/profile/expense" className="mx-2 p-1">
            Expense
          </Link>
          <Link to="/profile" className="mx-2 p-1">
            Profile
          </Link>
        </span>
        <span className="mb-3 mb-lg-0">
          {isPro && <Button variant="outline-dark me-3 fs-5" size="sm" onClick={themeToggler}>◑</Button>}
          <Button
            variant="warning rounded-pill px-4 py-1 "
            onClick={openupdateprofile}
          >
            Your profile is incomplete.{" "}
            <strong className="text-primary">Complete now</strong>
          </Button>
          {showpro && (
            <Button
              variant="primary text-white fw-bold border-0 ms-3 mt-3 mt-lg-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #00dbde 0%, #fc00ff 100%)",
              }}
              onClick={prounclockhandler}
            >
              Activate Pro
            </Button>
          )}
          {usertoken && (
            <Button
              variant="outline-danger ms-3 mt-3 mt-lg-0"
              onClick={logouthandler}
            >
              Log Out
            </Button>
          )}
        </span>
      </div>

      {updateform && (
        <Row md={2} className="w-100">
          <Col md={4} className="d-flex flex-column align-items-center my-5">
            <Image
              src={userdata.photourl}
              roundedCircle
              width="200px"
              className="border"
            />
            <strong>{userdata.displayname}</strong>
            <strong>{userdata.email}</strong>
          </Col>
          <Col md={8}>
            <Form
              className="my-5 border-bottom border-2 p-3"
              onSubmit={submitHandler}
            >
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold fs-4">Contact Details</span>
                <span>
                  <Button
                    variant="outline-danger fw-bold"
                    onClick={closeupdateprofile}
                  >
                    Cancel
                  </Button>
                </span>
              </div>
              <Row className="my-3">
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="userfullname"
                  >
                    <Form.Label column sm="5" className="fw-bold fs-5">
                      Full Name
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="text"
                        placeholder="Full name"
                        ref={newname}
                        defaultValue={userdata.displayname}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="userprofileurl"
                  >
                    <Form.Label column sm="5" className="fw-bold fs-5">
                      Profile Photo Url
                    </Form.Label>
                    <Col sm="7">
                      <Form.Control
                        type="text"
                        placeholder=""
                        ref={newprofileurl}
                        defaultValue={userdata.photourl}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
              <div className="w-100 d-flex justify-content-around">
                <Button variant="danger" type="submit">
                  Update
                </Button>
                <Button
                  variant="outline-success fw-bold"
                  disabled={userdata.emailverified}
                  onClick={sendverifyhandler}
                >
                  {userdata.emailverified ? (
                    <>Email is verified ✔</>
                  ) : (
                    <>Verify Email</>
                  )}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      )}

      {usertoken && (
        <Route path="/profile/expense">
          <Expense />
        </Route>
      )}
    </div>
  );
};

export default Profile;

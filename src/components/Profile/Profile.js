import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Row, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [updateform, setupdateform] = useState(false);
  const history=useHistory()
  const [userdata, setuserdata] = useState({
    displayname: "",
    email: "",
    photourl: "",
    emailverified: false,
  });

  const newname = useRef(null);
  const newprofileurl = useRef(null);
  const updatetoggler = () => {
    setupdateform((prev) => !prev);
  };

  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCNjyGdvZOwov0B76Oqc9_7DGWkVBnUODY";
  const token = localStorage.getItem("usertoken");

  useEffect(() => {
    const getuserdata = async () => {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
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
  }, [token]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewname = newname.current.value;
    const photourl = newprofileurl.current.value;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: token,
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
          idToken: token,
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

  const logouthandler=()=>{
    if(window.confirm('Want to Log Out ?'))
    {
      window.localStorage.removeItem('usertoken')
      history.replace('/auth')
    }
  }

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <div className="border p-3 d-flex justify-content-between align-items-center w-100">
        <span className="fs-4">Welcome to Expense Tracker !!!</span>
        <span>
          <Button
            variant="warning rounded-pill px-4 py-1"
            onClick={updatetoggler}
          >
            Your profile is incomplete.{" "}
            <strong className="text-primary">Complete now</strong>
          </Button>
          {token && <Button variant="outline-danger ms-3" onClick={logouthandler}>Log Out</Button>}          
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
                  <Button variant="outline-danger fw-bold">Cancel</Button>
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
    </div>
  );
};

export default Profile;

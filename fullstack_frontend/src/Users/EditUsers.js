import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUsers() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    userName: "",
    contactNo: "",
    email: "",
  });

  const { name, userName, contactNo, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const contactRegex = /^\d{8,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //   const contactNo = e.target.value;
    console.log(contactNo);
    if (!contactRegex.test(contactNo) || !emailRegex.test(email)) {
      alert(
        "Invalid contact number or email format\nPlease try again with entering correct format"
      );
    }

    try {
      await axios.put(`http://localhost:8080/api/users/update/${id}`, user, {
        headers: {
          sessionId: "c073875c-0ad2-11ee-bc31-c85b76f75c0e",
        },
      });
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert(
          "An error occurred while processing your request. Please try again later."
        );
      } else {
        console.error(error);
      }
    }
  };

  const loadUser = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/users/fetchById/${id}`,
      {
        headers: {
          sessionId: "c073875c-0ad2-11ee-bc31-c85b76f75c0e",
        },
      }
    );

    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 offset-md-3 border rounded p=4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>
          <hr></hr>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                UserName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter you Username"
                value={userName}
                name="userName"
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="ContactNo" className="form-label">
                Contact No
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter you 10 digit contact number"
                value={contactNo}
                name="contactNo"
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter you valid Email address"
                value={email}
                name="email"
                onChange={(e) => onInputChange(e)}
              ></input>
            </div>
            <button type="submit" className="btn btn-outline-primary mb-3">
              Submit
            </button>
            <Link
              type="submit"
              className="btn btn-outline-danger mx-3 mb-3"
              to="/"
            >
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

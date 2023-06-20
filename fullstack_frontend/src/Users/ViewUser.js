import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import userInfo from './Images/userInfo.png'

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    userName: "",
    contactNo: "",
    email: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/fetchById/${id}`,
        {
          headers: {
            sessionId: "c073875c-0ad2-11ee-bc31-c85b76f75c0e",
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-4">
            <div className="card-header">
              <h2 className="text-center">User Details</h2>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <img
                    src={userInfo}
                    alt="User"
                    className="rounded-circle img-fluid"
                  />
                </div>
                <div className="col-md-8">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <span className="font-weight-bold">
                        <b>Name:</b>
                      </span>{" "}
                      {user.name}
                    </li>
                    <li className="list-group-item">
                      <span className="font-weight-bold">
                        <b>UserName:</b>
                      </span>{" "}
                      {user.userName}
                    </li>
                    <li className="list-group-item">
                      <span className="font-weight-bold">
                        <b>Email:</b>
                      </span>{" "}
                      {user.email}
                    </li>
                    <li className="list-group-item">
                      <span className="font-weight-bold">
                        <b>Contact No:</b>
                      </span>{user.contactNo}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              <Link className="btn btn-primary my-2" to={"/"}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

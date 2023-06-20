import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/users/get-all-paginated?page=${
          currentPage - 1
        }&size=${pageSize}`,
        {
          headers: {
            sessionId: "c073875c-0ad2-11ee-bc31-c85b76f75c0e",
          },
        }
      );

      setUsers(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${id}`, {
        headers: {
          sessionId: "c073875c-0ad2-11ee-bc31-c85b76f75c0e",
        },
      });
      loadUsers();
    } catch (error) {
      if (error.request) {
        // Handle network errors
        console.error("Network Error:", error.message);
        alert(
          "There was a problem with the network connection. Please try again later."
        );
      }
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow table-hover table-borderless">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Contact No</th>
              <th scope="col"> &#160; &#160; &#160; &#160; Action </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{(currentPage - 1) * pageSize + index + 1}</th>
                <td>{user.name}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.contactNo}</td>
                <td>
                  <Link className="btn" to={`/viewUser/${user.id}`}>
                    <i className="bi bi-eye"></i>
                  </Link>
                  <Link className="btn me-1" to={`/editUser/${user.id}`}>
                    <i className="bi bi-pencil"></i>
                  </Link>
                  <button className="btn" onClick={() => deleteUser(user.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="Pagination">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <li
                className={`page-item ${page === currentPage ? "active" : ""}`}
                key={page}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

import React, { useState, useEffect,useCallback } from "react";
import "../style/users.scss";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function Users() {
  const url = process.env.REACT_APP_BACK_URL;
  const [search] = useSearchParams();
  const id = search.get("id");

  // State Management
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Change this to show more/less per page

  // Fetch Users on Load
  // 1. Wrap the function in useCallback
  // 2. Move it ABOVE the useEffect
  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${url}/api/v2/get-puser-list?id=${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setUsers(res.data.users || []);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }, [url, id]); // 3. List dependencies that the function relies on

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]); // 4. Now include fetchUsers here

  // --- Logic for Pagination ---
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- Action Handlers ---
  const handelApproved = async (userId) => {
    if (window.confirm("Are you sure you want to approve this user?")) {
      try {
        const res = await axios.put(
          `${url}/api/v2/approve-user/${userId}?id=${id}`,
          {},
          {
            withCredentials: true,
          },
        );
        if (res.status === 200) {
          setUsers(users.filter((user) => user.id !== userId));
          alert("User approved successfully");
        }
      } catch (err) {
        alert("Failed to approve user");
      }
    }
  };

  return (
    <div className="full-page-container">
      <div className="content-wrappera">
        <header className="page-header">
          <h1>Users Management</h1>
          <p>View, edit, and manage your system users.</p>
        </header>

        <div className="table-container">
          <div className="table-header">
            <span>Total Users: {users.length}</span>
          </div>

          {/* Responsive Wrapper */}
          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Access Level</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.user_name}</strong>
                    </td>
                    <td>{user.user_email}</td>
                    <td>
                      <span className="role-tag">{user.user_role}</span>
                    </td>
                    <td>
                      <div className="status-container">
                        <span className={`status-dot ${user.is_active}`}></span>
                        {user.is_active ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn-delete"
                        onClick={() => handelApproved(user.uuid)}
                      >
                        Approved
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>

            <div className="page-numbers">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import "../style/users.scss";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

export default function Users() {
  const url = process.env.REACT_APP_BACK_URL;
  const [search] = useSearchParams();
  const id = search.get("id");
  const { roles } = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);

  // State Management
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({});
  const usersPerPage = 5;

  // Fetch Users on Load and when page or id changes
  useEffect(() => {
    setCurrentPage(1);
    fetchUsers(1);
  }, [id]);

  // Fetch Users when page changes
  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const res = await axios.get(
        `${url}/api/v2/get-user-list?id=${id}&page=${page}&limit=${usersPerPage}`,
        {
          withCredentials: true,
        },
      );
      if (res.status === 200) {
        setUsers(res.data.users || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalUsers(res.data.totalUsers || 0);
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  // Current page users come directly from API
  const currentUsers = users;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // --- Action Handlers ---
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await axios.delete(`${url}/api/v2/delete-user/${userId}?id=${id}`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setUsers(users.filter((user) => user.uuid !== userId));
          alert("User deleted successfully");
        }
      } catch (err) {
        alert("Failed to delete user");
      }
    }
  };

  // Check if manager can edit this user
  const canEditUser = (user) => {
    if (roles === "manager" && user.user_role === "admin") {
      return false; // Manager cannot edit admin users
    }
    return true;
  };

  const handleUpdate = (user) => {
    if (!canEditUser(user)) {
      alert("Managers cannot edit admin users");
      return;
    }
    setEditingUser(user);
    setFormData({
      user_name: user.user_name,
      user_email: user.user_email,
      user_role: user.user_role,
      is_active: user.is_active,
    });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      alert(roles);
      // Double-check: prevent manager from editing admin users
      if (roles === "manager" && editingUser.user_role === "admin") {
        alert("Managers cannot edit admin users");
        return;
      }

      const updateData = {};

      // Manager can only update user role
      if (roles === "manager") {
        updateData.user_role = formData.user_role;
        updateData.user_name = formData.user_name;
        updateData.user_email = formData.user_email;
        updateData.user_role = formData.user_role;
        updateData.is_active = formData.is_active;
      } else if (roles === "admin") {
        // Admin can update all fields
        updateData.user_name = formData.user_name;
        updateData.user_email = formData.user_email;
        updateData.user_role = formData.user_role;
        updateData.is_active = formData.is_active;
      }

      const res = await axios.put(
        `${url}/api/v2/update-user/${editingUser._id}?id=${id}`,
        updateData,
        {
          withCredentials: true,
        },
      );

      if (res.status === 200) {
        alert("User updated successfully");
        setShowModal(false);
        fetchUsers(currentPage);
      }
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update user");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({});
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
                        className="btn-edit"
                        onClick={() => handleUpdate(user)}
                        disabled={
                          roles === "manager" && user.user_role === "admin"
                        }
                        title={
                          roles === "manager" && user.user_role === "admin"
                            ? "Managers cannot edit admin users"
                            : "Edit user"
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(user.uuid)}
                      >
                        Delete
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

        {/* Update User Modal */}
        {showModal && editingUser && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Edit User</h2>
                <button className="modal-close" onClick={handleCloseModal}>
                  ✕
                </button>
              </div>

              <div className="modal-body">
                {/* Manager Role - Only edit user role */}

                <>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name || ""}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter user name"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="user_email"
                      value={formData.user_email || ""}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="form-group">
                    <label>Access Level (Role)</label>
                    <select
                      name="user_role"
                      value={formData.user_role || ""}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="user">User</option>
                      <option value="manager">Manager</option>
                      {roles === "manager" ? (
                        <p>you can add admin</p>
                      ) : (
                        <option value="admin">Admin</option>
                      )}
                    </select>
                  </div>

                  <div className="form-group form-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active || false}
                        onChange={handleInputChange}
                      />
                      <span>Active Status</span>
                    </label>
                  </div>
                </>
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button className="btn-submit" onClick={handleUpdateSubmit}>
                  Update User
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

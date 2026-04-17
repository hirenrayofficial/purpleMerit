import React, { useState } from "react";
import axios from "axios";
import "../style/profile.scss";
import { getUser } from "../../utils/auth";
import { useSearchParams } from "react-router-dom";

export default function Profile() {
  const url = process.env.REACT_APP_BACK_URL;

  const [search] = useSearchParams();
  const id = search.get("id");

  const [userName, setUserName] = useState(""); // Default from context/state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const userDt = getUser();

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${url}/api/v2/update-profile-name/${userDt.uuid}?id=${id}`,
        {
          user_name: userName,
        },
        {
          withCredentials: true,
        },
      );
      if (res) {
        alert("Name updated successfully!");
      }
    } catch (err) {
      alert("Error updating name");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm)
      return alert("Passwords do not match");
    try {
      await axios.put(
        `${url}/api/v2/change-password/${userDt.uuid}?id=${id}`,
        passwords,
        {
          withCredentials: true,
        },
      );
      alert("Password changed!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (err) {
      alert("Error changing password");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "CRITICAL: Are you sure? This will permanently delete your account.",
    );
    if (confirmed) {
      try {
        await axios.delete(
          `${url}/api/v2/delete-account/${userDt.uuid}?id=${id}`,
          {
            withCredentials: true,
          },
        );
        alert("Account deleted. Redirecting to homepage...");
        window.location.href = "/login";
      } catch (err) {
        alert("Action failed");
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <h1>Account Settings</h1>
          <p>Update your personal information and security settings.</p>
        </header>

        {/* Name Update Section */}
        <section className="settings-section">
          <h3>Personal Information</h3>
          <form onSubmit={handleUpdateName}>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                value={userName || userDt.name}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </form>
        </section>

        <hr className="divider" />

        {/* Password Update Section */}
        <section className="settings-section">
          <h3>Security</h3>
          <form onSubmit={handleChangePassword}>
            <div className="input-group">
              <label>Current Password</label>
              <input
                type="password"
                onChange={(e) =>
                  setPasswords({ ...passwords, current: e.target.value })
                }
              />
            </div>
            <div className="input-grid">
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setPasswords({ ...passwords, new: e.target.value })
                  }
                />
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setPasswords({ ...passwords, confirm: e.target.value })
                  }
                />
              </div>
            </div>
            <button type="submit" className="btn-save">
              Update Password
            </button>
          </form>
        </section>

        <hr className="divider" />

        {/* Delete Account Section */}
        <section className="settings-section danger-zone">
          <div className="danger-text">
            <h3>Delete Account</h3>
            <p>
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
          </div>
          <button onClick={handleDeleteAccount} className="btn-delete-account">
            Delete My Account
          </button>
        </section>
      </div>
    </div>
  );
}

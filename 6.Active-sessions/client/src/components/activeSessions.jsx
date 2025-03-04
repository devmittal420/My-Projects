import React,{ useState, useEffect } from "react";
import { checkSession, logout, submitForm } from "../apiCalls/api";
import "./activeSessions.css";

const ActiveSession = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [sessionData, setSessionData] = useState([]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await checkSession();
        console.log("Full API Response:", response);
        setSessionData(response.data.session || []);
      } catch (error) {
        console.log("No active session found", error);
      }
    };

    fetchSession();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      return console.log("Username and password required");
    }

    try {
      const response = await submitForm(form);
      console.log("Login Response:", response.data);
      setSessionData(
        response.data.sessionData ? [response.data.sessionData] : []
      );
      console.log(response.data.sessionData, "response");

      setForm({ username: "", password: "" });
    } catch (error) {
      console.log("Invalid credentials or server error", error);
    }
  };

  const handleLogout = async (id) => {
    try {
      const response = await logout(id);
      setSessionData((prev) => prev.filter((session) => session._id !== id));
    } catch (err) {
      console.log("Logout error: ", err);
    }
  };

  return (
    <div className="container">
      <h2>Submit Form</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      {sessionData.length > 0 ? (
        sessionData.map((session, index) => (
          <div key={index} className="session-box">
            <p>
              <b>User:</b> {session.username}
            </p>
            <p>
              <b>IP:</b> {session.ip}
            </p>
            <p>
              <b>Device:</b> {session.device}
            </p>
            <p>
              <b>OS:</b> {session.os}
            </p>
            <p>
              <b>Session Created:</b>{" "}
              {new Date(session.createdAt).toLocaleString()}
            </p>
            <button
              onClick={() => handleLogout(session._id)}
              className="btn logout-btn"
            >
              Logout
            </button>
          </div>
        ))
      ) : (
        <p>No active sessions found.</p>
      )}
    </div>
  );
};

export default ActiveSession;

import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";

const users = [
  { id: 1, name: "User1", hasCrash: true },
  { id: 2, name: "User2", hasCrash: true },
  { id: 3, name: "User3", hasCrash: false },
];

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogin = (user) => {
    setUser(user);
    navigate("/");
  };

  return (
    <div>
      <h2>Login Page</h2>
      {users.map((user) => (
        <button key={user.id} onClick={() => handleLogin(user)} style={{ display: "block", margin: "10px" }}>
          Login as {user.name}
        </button>
      ))}
    </div>
  );
};

const Home = ({ user }) => {
  useEffect(() => {
    if (!user) return;

    if (user.hasCrash) {
      Sentry.captureEvent({
        message: `App crash for ${user.name}`,
        level: "error",
      });
    } else {
      const requestPayload = { userId: user.id };

      fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sample_token",
        },
        body: JSON.stringify(requestPayload),
      })
        .then(async (response) => {
          const responseData = await response.json();

          if (!response.ok) {
            Sentry.captureEvent({
              message: `API error for ${user.name}`,
              level: "error",
              extra: {
                status: response.status,
                requestURL: response.url,
                requestMethod: "POST",
                requestHeaders: { "Content-Type": "application/json", Authorization: "Bearer sample_token" },
                requestPayload: requestPayload,
                responseData: responseData,
              },
            });
          }
        })
        .catch((error) => {
          Sentry.captureEvent({
            message: `Network error for ${user.name}`,
            level: "error",
            extra: {
              requestURL: "https://jsonplaceholder.typicode.com/poss/1",
              requestMethod: "POST",
              requestHeaders: { "Content-Type": "application/json", Authorization: "Bearer sample_token" },
              requestPayload: requestPayload,
              errorMessage: error.message,
            },
          });
        });
    }
  }, [user]);

  return (
    <div>
      <h2>Home Page</h2>
      <p>Welcome, {user ? user.name : "Guest"}</p>
      <Link to="/login">Logout</Link>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={user ? <Home user={user} /> : <Login setUser={setUser} />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
    </Routes>
  );
};

export default Sentry.withProfiler(App);

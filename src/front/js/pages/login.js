import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = () => {
    actions.login(username, password);
  };

  if (store.token && store.token != "" && store.token != undefined)
    navigate("/");

  return (
    <div className="text-center mt-5">
      {store.token && store.token != "" && store.token != undefined ? (
        `You are logged in with ${store.token}`
      ) : (
        <div>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>Log in</button>
        </div>
      )}
    </div>
  );
};

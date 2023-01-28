import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {

        const options = {
          method: "POST",
          body: JSON.stringify({
            "email": email,
            "password": password
          })
        }

        fetch('https://3000-4geeksacade-reactflaskh-i8fhdh2r88x.ws-eu84.gitpod.io/api/token', options)   
        .then(response => {
          if (response == 200) return response.json();
          else alert("theres been an error")
        })
        .then()
        .catch(Error => {
          console.error(Error)
        })

    }

  return (
    <div className="text-center mt-5">
      <div>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={handleClick}>Log in</button>
      </div>
    </div>
  );
};

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      syncToken: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      login: async (username, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        };

        try {
          const response = await fetch(
            "https://3001-nicolettast-reactflaska-aybhpnhzcco.ws-eu85.gitpod.io/api/token",
            options
          );
          if (response.status !== 200) {
            alert("theres been an error");
            return false;
          }

          const data = await response.json();
          console.log("this came from the backend", data);
          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("there has been an login error", error);
        }
      },

      getMessage: () => {
        const store = getStore();
        const opt = {
          headers: { Authorization: "Bearer " + store.token },
        };

        fetch(
          "https://3001-nicolettast-reactflaska-aybhpnhzcco.ws-eu85.gitpod.io/api/hello",
          opt
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data.message);
            setStore({ message: data.message });
          })

          .catch((error) => console.error("there is an error", error));
      },

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
      },

      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;

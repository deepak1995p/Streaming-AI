import React from "react";
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig.js";

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
    >
      Sign In
    </button>
  );
};

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg"
    >
      Sign Out
    </button>
  );
};

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <div>
          <h1 className="text-2xl">Welcome to the App</h1>
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default App;


// import React from "react";
// import LoginBg from "../assets/login_bg.svg";

// const Login = () => {
//   const handleLogin = () => {
//     localStorage.setItem("authToken", "dummyToken");
//     window.location.href = "/main/chat";
//   };

//   return (
//     <div className="h-screen bg-[url('/src/assets/login_bg.svg')] bg-no-repeat bg-right-bottom bg-[length:550px_680px]">
//       <div className="px-[110px] pt-[170px] flex justify-start items-start h-screen">
//         Hello
//       </div>
//       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//         <button className="px-4 py-2 bg-blue-500 text-white rounded">
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import LoginBg from "../assets/login_bg.svg";

const Login = () => {
  const handleLogin = () => {
    localStorage.setItem("authToken", "dummyToken");
    window.location.href = "/main/chat";
  };

  return (
    <div className="h-screen bg-[url('/src/assets/login_bg.svg')] bg-no-repeat bg-right-bottom bg-[length:550px_680px]">
      <div className="px-[110px] pt-[170px] flex justify-start items-start h-screen">
        Hello
      </div>
      {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </div> */}
    </div>
  );
};

export default Login;

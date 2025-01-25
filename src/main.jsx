import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/Context.jsx";
import { ChainlitAPI, ChainlitContext } from "@chainlit/react-client";
import { RecoilRoot } from "recoil";

const CHAINLIT_SERVER = "http://localhost:80/chainlit";

const apiClient = new ChainlitAPI(CHAINLIT_SERVER, "webapp");

createRoot(document.getElementById("root")).render(
  <ChainlitContext.Provider value={apiClient}>
    <ContextProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ContextProvider>
  </ChainlitContext.Provider>
);

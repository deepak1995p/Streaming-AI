import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./context/Context.jsx";
import { ChainlitAPI, ChainlitContext } from "@chainlit/react-client";
import { RecoilRoot } from "recoil";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config/authConfig.js";

const CHAINLIT_SERVER = "http://localhost:80/chainlit";

const apiClient = new ChainlitAPI(CHAINLIT_SERVER, "webapp");
const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")).render(
  <MsalProvider instance={msalInstance}>
    <ChainlitContext.Provider value={apiClient}>
      <ContextProvider>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </ContextProvider>
    </ChainlitContext.Provider>
  </MsalProvider>
);

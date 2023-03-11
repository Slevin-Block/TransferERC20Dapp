import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from 'recoil';
import { EthProvider } from "./contexts/EthContext";
import "./assets/styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <EthProvider>
                <App />
            </EthProvider>
        </RecoilRoot>
    </React.StrictMode>
);

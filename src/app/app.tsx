import React from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import NavigationRouter from "./routeurs/navigations.routeur";

const root = createRoot(document.body);
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00b96b",
        borderRadius: 2,
      },
    }}
  >
    <NavigationRouter />
  </ConfigProvider>
);

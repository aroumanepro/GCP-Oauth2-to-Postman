import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "../layouts/default";

const Home = lazy(() => import("../pages/home"));
const ServerPage = lazy(() => import("../pages/server"));
const GcloudPage = lazy(() => import("../pages/gcloud"));

const NavigationRouter: React.FC = () => {
  return (
    <Router>
      <DefaultLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/main_window" element={<Home />} />
            <Route path="/server" element={<ServerPage />} />
            <Route path="/gcloud" element={<GcloudPage />} />
            <Route path="/doc" element={<Home />} />
          </Routes>
        </Suspense>
      </DefaultLayout>
    </Router>
  );
};

export default NavigationRouter;

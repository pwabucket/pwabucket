import { Route, Routes } from "react-router";

import AppDetails from "./pages/AppDetails";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="apps/:id" element={<AppDetails />} />
    </Routes>
  );
}

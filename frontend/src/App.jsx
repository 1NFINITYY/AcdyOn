import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Submissions from "./pages/Submissions";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/submissions"
          element={<Submissions />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
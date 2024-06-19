import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import MostWatchedContent from "./pages/MostWatchedContent.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MostWatchedContent />} />
      </Routes>
    </Router>
  );
}

export default App;

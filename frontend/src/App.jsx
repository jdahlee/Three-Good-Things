import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import LogEntry from "./pages/LogEntry";
import LogFind from "./pages/PastLogs";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/log" element={<LogEntry />} />
        <Route path="/pastentries" element={<LogFind />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

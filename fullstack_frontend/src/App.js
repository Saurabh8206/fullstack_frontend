import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./Layout/NavBar";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddUser from "./Users/AddUser";
import EditUsers from "./Users/EditUsers";
import ViewUser from "./Users/ViewUser";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/editUser/:id" element={<EditUsers />} />
          <Route path="/viewUser/:id" element={<ViewUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

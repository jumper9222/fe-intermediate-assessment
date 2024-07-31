import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import EditTasks from "./pages/EditTasks";
import Dashboard from "./pages/Dashboard";
import AddTasks from "./pages/AddTasks";
import RequireAuth from "./components/RequireAuth";
import LoggedIn from "./components/LoggedIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavigationBar />}>
          <Route index element={<LoggedIn element={<Home />} />} />
          <Route path="/dashboard" element={<RequireAuth element={<Dashboard />} />} />
          <Route path="/add" element={<RequireAuth element={<AddTasks />} />} />
          <Route path="/edit/:id" element={<RequireAuth element={<EditTasks />} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
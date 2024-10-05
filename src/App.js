import React from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Home } from "./components/Home";
import { UsersList } from "./components/UsersList";
import { UserDetails } from "./components/UserDetails";
import { UserForm } from "./components/UserForm";
import { EditUsers } from "./components/EditUsers";

const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/users">UsersList</Link>
              </li>
              <li>
                <Link to="/add-user">Add user</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/users" element={<UsersList />} />
            <Route path="/users/:userId" element={<UserDetails />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/edit-user/:id" element={<EditUsers />} />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

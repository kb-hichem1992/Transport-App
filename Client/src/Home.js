import React from "react";
import SearchAppBar from "./appBar.js";
import Dashboard from "./Dashboard.js";
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const {isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>
  if (isAuthenticated === true) {
    return <Dashboard />;
  } else {
    return <SearchAppBar />;
  }
};

export default Home;

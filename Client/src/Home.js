import React from "react";
import Dashboard from "./Dashboard.js";
import { useAuth0 } from '@auth0/auth0-react';

const Home = () => {
  const {loginWithRedirect, isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();
  

  if (isLoading) return <div>Chargement...</div>
  if (isAuthenticated === true) {
    return <Dashboard />;
  } else {
    loginWithRedirect();
  }
};

export default Home;

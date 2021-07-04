import React, { useMemo, useState } from "react";
import Dashboard from "./Dashboard.js";
import { useAuth0 } from '@auth0/auth0-react';



const Home = () => {
  const {loginWithRedirect, isAuthenticated } = useAuth0();
  const { isLoading } = useAuth0();
 
const [user, setUser] = useState(null);

const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  if (isLoading) return <div>Chargement...</div>
  if (isAuthenticated === true) {
    return <Dashboard />;
  } else {
   // loginWithRedirect();
   return <div> login </div>
  }
};

export default Home;

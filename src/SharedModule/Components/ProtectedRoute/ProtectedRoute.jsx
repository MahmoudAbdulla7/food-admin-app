import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ adminData, children }) {
  useEffect(() => {
    let data = adminData;
  }, []);

  if (adminData && adminData.userId ) {
    return children;
  } else {
    <Navigate to="/login" />;
  }
}

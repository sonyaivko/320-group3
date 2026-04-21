import { Navigate } from "react-router-dom";
import { ReactNode, ReactElement } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
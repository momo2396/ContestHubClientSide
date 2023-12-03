import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";
import { Navigate } from "react-router-dom";
import useGetData from "./useGetData";

const RoleCheck = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  const { data, isLoading } = useGetData(`/all-users/${user?.userEmail}`);
  if (isLoading) {
    return (
      <progress className="progress w-56 flex justify-center items-center"></progress>
    );
  }
  if (data?.status === role) {
    return children;
  }
  return <Navigate to="/dashboard"></Navigate>;
};

export default RoleCheck;

import { Navigate } from "react-router-dom";
import useUser from "hooks/useUser";
import { SIGN_IN } from "constants/routes";

const AuthRoute = ({ redirectPath = SIGN_IN, children }) => {
  const { isLoggedIn } = useUser();
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AuthRoute;

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.token.token)
  const navigate = useNavigate();

  useEffect(() => {
    if ( token === null ) {
      navigate('/preview', { replace: true })
    }
  }, [navigate, token]);

  return children;
}

export default ProtectedRoute;
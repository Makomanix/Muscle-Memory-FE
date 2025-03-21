import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PreventedRoute({ children }) {
  const email = useSelector((state) => state.user.user.email)
  const navigate = useNavigate();

  useEffect(() => {
    if ( email ) {    
        navigate('/', { replace: true })
    }
  }, [navigate, email]);

  return children;
}

export default PreventedRoute;

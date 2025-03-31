import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStorageUser } from "../util/sessionStorage";

function PublicRoutes({ children }) {
  const [ isLoading, setIsLoading ] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!getStorageUser()) {
      setIsLoading(false)
    } else {
      navigate('/', { replace: true })
    }
  }, [navigate, isLoading]);
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  return children;
}

export default PublicRoutes;
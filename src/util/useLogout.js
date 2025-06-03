import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearStorageUser } from "./sessionStorage";
import { clearUser } from "../store/userSlice";

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return function handleLogout() {
    clearStorageUser();
    dispatch(clearUser());
    navigate('/preview', { replace: true });
  }
  
}
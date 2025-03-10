import { useCallback } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";

export default function useNavigateBack() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateBack = useCallback(() => {
    return navigate(location.key !== "default" ? -1 : "/");
  }, [location, navigate]);

  return navigateBack;
}

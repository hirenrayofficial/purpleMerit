import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback, // 1. Added useCallback
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { dcryptToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = useState("");
  const navigate = useNavigate();
  const [prams] = useSearchParams();
  
  const id = prams.get("id");
  const role = prams.get("role");
  const url = process.env.REACT_APP_BACK_URL;

  const hasRun = useRef(false);

  // 2. Wrap the function in useCallback
  const handleGetrole = useCallback(async () => {
    // Only proceed if id exists to prevent unnecessary API calls
    if (!id) return; 

    try {
      const res = await axios.get(`${url}/api/v2/check?id=${id}`);
      if (res.data) {
        const roleData = dcryptToken(res.data.token);
        const checkRole = roleData.role === role;
        
        if (checkRole) {
          // Simplified role setting logic
          if (["admin", "manager", "user"].includes(roleData.role)) {
            setRoles(roleData.role);
          } else {
            console.log("user error");
            setRoles("");
          }
        } else {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Auth error:", error);
      navigate("/");
    }
  }, [id, role, url, navigate]); // 3. Dependencies for the function

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    
    handleGetrole();
  }, [handleGetrole]); // 4. Now handleGetrole is a safe dependency

  return (
    <AuthContext.Provider value={{ roles, handleGetrole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
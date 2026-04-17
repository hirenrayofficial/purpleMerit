import axios from "axios";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { dcryptToken } from "../utils/auth";
// import { toast } from 'sonner';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [roles, setRoles] = useState("");

  const navigate = useNavigate();

  const [prams] = useSearchParams();
  const id = prams.get("id");
  const role = prams.get("role");
  const url = process.env.REACT_APP_BACK_URL;

  const hasRun = useRef(false);

  const handleGetrole = async () => {
    const res = await axios.get(`${url}/api/v2/check?id=${id}`);
    if (res.data) {
      const roleData = dcryptToken(res.data.token);
      const checkRole = roleData.role === role;
      if (checkRole) {
        if (roleData.role === "admin") {
          setRoles("admin");
        } else if (roleData.role === "manager") {
          setRoles("manager");
        } else if (roleData.role === "user") {
          setRoles("user");
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
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    handleGetrole();
  }, []);

  return (
    <AuthContext.Provider value={{ roles, handleGetrole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

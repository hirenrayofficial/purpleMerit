import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const key = process.env.REACT_APP_SECRET_KEY;
export const getToken = () => {
  const cookies = Cookies.get("userauth");
  return cookies;
};


export const getUser = () => {
  const token = getToken();
  if (!token) return null;
  const decodDetail = jwtDecode(token, key);
  return decodDetail;
};
export const dcryptToken = (token) => {
  if (!token) return null;
  const decodDetail = jwtDecode(token, key);
  return decodDetail;
};
export const isExpire = (token) => {
  const decode = jwtDecode(token, key);
  const check = decode.exp * 1000 < Date.now();
  return check;
};

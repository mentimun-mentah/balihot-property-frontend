import { useState } from "react";
import axios, { headerCfgFormData } from "../lib/axios";
import { isAuth } from "./withAuth.js"

const isAdmin = () => {
  const [admin, setAdmin] = useState(false);
  axios.post('/property/create', null, headerCfgFormData)
    .catch(err => {
      if(err.response.status == 400){
        setAdmin(true)
      }
    })
  if(isAuth() && admin) return admin
}

export default isAdmin;

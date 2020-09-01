import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { parseCookies } from "nookies";

import * as actions from "../../store/actions";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const onTryAutoSignin = useCallback(() => dispatch(actions.authCheckState()), [dispatch]);
  const onTryGetUser = useCallback(() => dispatch(actions.getUser()), [dispatch]);
  const {access_token, refresh_token} = parseCookies()

  let mounted = false

  useEffect(() => {
    onTryAutoSignin();
    mounted = true
  }, []);

  useEffect(() => {
    if(mounted) {
      setTimeout(() => {
        onTryGetUser();
      }, 2000)
    }
  }, []);

  useEffect(() => {
      if(access_token && refresh_token){
	setTimeout(() => {
    	  onTryAutoSignin();
	  onTryGetUser();
	}, 4000)
      }
  }, [parseCookies]);

  return (
    <>
      <Header /> {children} <Footer />
    </>
  );
};

export default Layout;

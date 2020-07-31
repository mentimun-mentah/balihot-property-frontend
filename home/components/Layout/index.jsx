import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import * as actions from "../../store/actions";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const onTryAutoSignin = useCallback(() => dispatch(actions.authCheckState()), [dispatch]);

  useEffect(() => {
    onTryAutoSignin();
  }, []);

  return (
    <>
      <Header /> {children} <Footer />
    </>
  );
};

export default Layout;

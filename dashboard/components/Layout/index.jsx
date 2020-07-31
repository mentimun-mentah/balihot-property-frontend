import Header from "../Header";
import Sidebar from "../Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="main-content">
        <Header />
        {children}
      </div>
    </>
  );
};

export default Layout;

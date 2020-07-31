import Router from "next/router";

const Index = () => null;

Index.getInitialProps = (ctx) => {
  process.browser
    ? Router.replace("/admin", "/admin") //Redirec from Client Side
    : ctx.res.writeHead(302, { Location: "/admin" }).end(); //Redirec from Server Side
};

export default Index;

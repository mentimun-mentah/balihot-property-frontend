const Index = () => null;

Index.getInitialProps = (ctx) => {
  process.browser
    ? window.location.replace(process.env.BASE_URL) //Redirec from Client Side
    : ctx.res.writeHead(302, { Location: process.env.BASE_URL }).end(); //Redirec from Server Side
};

export default Index;

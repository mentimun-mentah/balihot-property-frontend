import { Component } from "react";
import cookies from "nookies";
import Router from "next/router";

const authenticate = ctx => {
  const { access_token } = cookies.get(ctx);

  if (ctx.req && !access_token) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return false;
  }

  if (!access_token) Router.push("/");

  return access_token;
};

const isAuth = ctx => {
  const { access_token, refresh_token } = cookies.get(ctx);
  return access_token && refresh_token;
};

const withAuth = WrappendComponent => {
  return class extends Component {
    static async getInitialProps(ctx) {
      const access_token = authenticate(ctx);
      const componentProps =
        WrappendComponent.getInitialProps &&
        (await WrappendComponent.getInitialProps(ctx));

      return { ...componentProps, access_token };
    }

    render() {
      return <WrappendComponent {...this.props} />;
    }
  };
};

export { withAuth, isAuth };

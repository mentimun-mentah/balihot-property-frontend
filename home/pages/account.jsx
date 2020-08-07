import { withAuth } from "../hoc/withAuth";

import cookie from "nookies";
import AccountDashboard from "../components/Account";
import axios from "../lib/axios";
import * as actions from "../store/actions";

const Account = () => {
  return <AccountDashboard />;
};

Account.getInitialProps = async ctx => {
  const { access_token } = cookie.get(ctx);
  const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
  const resType = await axios.get('/types');
  ctx.store.dispatch(actions.getTypeSuccess(resType.data));
  const resWishlist = await axios.get('/wishlist/user', headerCfg);
  ctx.store.dispatch(actions.getWishlistSuccess(resWishlist.data));
}

export default withAuth(Account);

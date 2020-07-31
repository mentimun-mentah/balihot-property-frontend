import { withAuth } from "../hoc/withAuth";

import AccountDashboard from "../components/Account";
import axios from "../lib/axios";
import * as actions from "../store/actions";

const Account = () => {
  return <AccountDashboard />;
};

Account.getInitialProps = async ctx => {
  const resProperty = await axios.get('/properties');
  ctx.store.dispatch(actions.getPropertySuccess(resProperty.data)); 
  const resType = await axios.get('/types');
  ctx.store.dispatch(actions.getTypeSuccess(resType.data));
}

export default withAuth(Account);

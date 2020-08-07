import { useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import swal from "sweetalert";
import axios from "../lib/axios";
import * as actions from "../store/actions";
import HomeContainer from "../components/Home";

const Home = ({ username, fresh }) => {
  useEffect(() => {
    if (fresh) {
      swal({
        icon: "success", title: `Welcome ${username}`, timer: 3000,
      }).then(() => {
        destroyCookie(null, "fresh");
      });
    }
  }, [swal, destroyCookie]);

  return <HomeContainer />;
};

Home.getInitialProps = async (ctx) => {
  const { username, fresh, access_token, refresh_token } = parseCookies(ctx);
  const resRegion = await axios.get('/regions?listing=true');
  ctx.store.dispatch(actions.getRegionSuccess(resRegion.data)); 
  const resTeam = await axios.get('/teams');
  ctx.store.dispatch(actions.getTeamSuccess(resTeam.data)); 
  const resType = await axios.get('/types');
  ctx.store.dispatch(actions.getTypeSuccess(resType.data)); 
  const resFacilities = await axios.get('/facilities');
  ctx.store.dispatch(actions.getFacilitySuccess(resFacilities.data)); 

  if(access_token, refresh_token){
    const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
    ctx.store.dispatch(actions.authSuccess(access_token, refresh_token, username));
    await axios.get(`/properties?property_for=Sale&per_page=3`, headerCfg)
      .then(res => {
        ctx.store.dispatch(actions.getPropertySuccess(res.data)); 
      })
      .catch(err => {
        if(err.response.data.msg === "Token has expired"){
          const headerCfgRefresh = { headers: { Authorization: `Bearer ${refresh_token}` } };
          axios.post("/refresh", null, headerCfgRefresh)
            .then(async res => {
              const headerCfgNew = { headers: { Authorization: `Bearer ${res.data.access_token}` } };
              const resProperty = await axios.get(`/properties?property_for=Sale&per_page=3`, headerCfgNew)
              ctx.store.dispatch(actions.getPropertySuccess(resProperty.data)); 
            })
        }
      })
  }

  return { username, fresh };
};

export default Home;

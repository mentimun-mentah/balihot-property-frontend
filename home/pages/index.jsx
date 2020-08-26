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
  const resNews = await axios.get(`/newsletters?per_page=2`);
  ctx.store.dispatch(actions.getNewsletterSuccess(resNews.data)); 

  if(access_token && refresh_token){
    try{
      const headerCfg = { headers: { Authorization: `Bearer ${access_token}` } };
      ctx.store.dispatch(actions.authSuccess(access_token, refresh_token, username));
      const resUser = await axios.get('/user', headerCfg);
      ctx.store.dispatch(actions.getUser(resUser.data));
      const resProp = await axios.get(`/properties?property_for=Sale&per_page=3`, headerCfg)
      ctx.store.dispatch(actions.getPropertySuccess(resProp.data)); 
    }
    catch (err){
      const resProp = await axios.get(`/properties?property_for=Sale&per_page=3`)
      ctx.store.dispatch(actions.getPropertySuccess(resProp.data)); 
      if(err.response.data.msg === "Token has expired"){
        ctx.store.dispatch(actions.refreshToken(ctx))
      }
      if(err.response.data.msg === "Token has been revoked"){
        ctx.store.dispatch(actions.logout(ctx))
      }
    }
  } else {
    const resProp = await axios.get(`/properties?property_for=Sale&per_page=3`)
    ctx.store.dispatch(actions.getPropertySuccess(resProp.data)); 
  }

  return { username, fresh };
};

export default Home;

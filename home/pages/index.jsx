import { useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import swal from "sweetalert";
import Router from "next/router";
import axios, { cookieOptions } from "../lib/axios";
import * as actions from "../store/actions";
import HomeContainer from "../components/Home";

const loginBtn = () => document.getElementById("btn-login-navbar").click();

const Home = ({ username, fresh, query }) => {
  useEffect(() => {
    if ((fresh && username !== undefined) || (username !== undefined)) {
      if(username !== "undefined" && fresh){
        swal({
          icon: "success", title: `Welcome ${username}`, timer: 3000,
        }).then(() => {
          destroyCookie(null, "fresh", { domain: process.env.DOMAIN });
        }).catch(() => {});
      }
    }
  }, [swal, destroyCookie]);

  useEffect(() => {
    var span = document.createElement("div");
    span.innerHTML = "<span>Login with the same email to be able to turn off email notifications</span>";
    span.className = "fs-12 text-secondary"

    const cookies = parseCookies()                                                          
    const { access_token, refresh_token } = cookies;
    for(let key in query){
      if(key === "unsubscribe" && query[key] ==="email"){
        if(access_token && refresh_token){
          Router.replace('/account?unsubscribe=email')
        } else {
          swal({
            icon: "info", 
            title: `You need to login first`, 
            content: span,
          }).then(() => {
            Router.replace(Router.pathname)
            loginBtn()
          });
        }
      }
    }
  },[])

  return <HomeContainer />;
};

Home.getInitialProps = async (ctx) => {
  const query = ctx.query;
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
      setTimeout(async() => {
        const resProp = await axios.get(`/properties?property_for=Sale&per_page=3`, headerCfg)
        ctx.store.dispatch(actions.getPropertySuccess(resProp.data)); 
      }, 2000)
    }
    catch (err){
      setTimeout(async() => {
        const resProp = await axios.get(`/properties?property_for=Sale&per_page=3`)
        ctx.store.dispatch(actions.getPropertySuccess(resProp.data)); 
      }, 2000)
      if(err.response.data.msg === "Token has been revoked"){
        ctx.store.dispatch(actions.logout(ctx))
      }
      if(err.response.status == 500){
        ctx.store.dispatch(actions.logout(ctx))
        destroyCookie(ctx, "access_token", cookieOptions);
        destroyCookie(ctx, "refresh_token", cookieOptions);
        destroyCookie(ctx, "username", cookieOptions);
      }
    }
  } else {
    setTimeout(async() => {
      const resProp = await axios.get(`/properties?property_for=Sale&per_page=3`)
      ctx.store.dispatch(actions.getPropertySuccess(resProp.data)); 
    }, 2000)
  }

  return { username, fresh, query };
};

export default Home;

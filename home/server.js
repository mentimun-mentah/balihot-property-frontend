const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser("baliHotProperty"));

  //User Confirm
  server.get("/user-confirm/:token", async (req, res) => {
    const { token } = req.params;
    await axios.put(`http://backend:5000/user-confirm/${token}`).then((response) => {
      res.cookie("access_token", response.data.access_token, { domain: process.env.DOMAIN });
      res.cookie("refresh_token", response.data.refresh_token, { domain: process.env.DOMAIN });
      res.cookie("username", response.data.username, { domain: process.env.DOMAIN });
      res.cookie("fresh", true, { domain: process.env.DOMAIN });
      res.redirect(302, process.env.BASE_URL);
    });
  });

  //Reset Password
  server.get("/password/reset/:token", async (req, res) => {
    const { token } = req.params;
    res.cookie("reset", token, { domain: process.env.DOMAIN });
    res.redirect(302, `${process.env.BASE_URL}/reset-password`);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (error) => {
    if (error) {
      throw error;
    }
    console.log("===== server is ready =====");
  });
});

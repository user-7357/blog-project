const { Router } = require("express");
const User = require("../models/user");

const router = Router();

router.get("/signIn", (req, res) => {
  return res.render("signIn");
});

router.get("/signUp", (req, res) => {
  return res.render("signUp");
});

router.post("/signUp", async (req, res) => {
  const { fullName, email, password } = req.body;

  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
});

router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log(token);
    return res.cookie("token", token).redirect("/");
    
  } 
  catch (error) {
    return res.render("signIn", { error: "Invalid Email or Password" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token").redirect("/user/signIn");
});


module.exports = router;

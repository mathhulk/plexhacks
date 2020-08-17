const router = require("express").Router( );

const member = require("./member");
router.use("/member", member);

const members = require("./members");
router.get("/members", members);

/*const legislation = require("./legislation");
router.get("/legislation", legislation);*/

const state = require("./state");
router.get("/state", state);

module.exports = router;

const router = require("express").Router( );

const member = require("./member");
router.get("/:identifier", member);

const roles = require("./roles");
router.get("/:identifier/roles", roles);

/*const votes = require("./votes");
router.get("/:identifier/votes", votes);*/

const committees = require("./committees");
router.get("/:identifier/committees", committees);

module.exports = router;

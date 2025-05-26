const router = require('express').Router();
//const agentRoutes = require("./agent-routes")
const ticketRoutes = require("./ticket-routes") 
//const requesterRoutes = require("./requester-routes")

//router.use("/agent", agentRoutes)
router.use("/ticket", ticketRoutes)
//router.use("/requester", requestRoutes)

module.exports = router
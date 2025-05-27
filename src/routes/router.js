const router = require('express').Router();
const express = require('express')
const app = express();
const agentRoutes = require("./agent-routes")
const ticketRoutes = require("./ticket-routes") 
//const requesterRoutes = require("./requester-routes")
console.log("router is running")

//app.use("/agent", agentRoutes)
//app.use("/ticket", ticketRoutes)
//router.use("/requester", requestRoutes)

console.log('agentRoutes:', agentRoutes);
console.log('ticketRoutes:', ticketRoutes);

router.use('/agent', agentRoutes);
router.use('/ticket', ticketRoutes);

router.get('/test', (req, res) => {
    res.json({ message: 'Test complete' });
  });

module.exports = router
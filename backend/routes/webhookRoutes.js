const express=require("express");
const router=express.Router();

router.post("/n8n-leads",(req,res) => {
    res.send("Webhook received");
})

module.exports = router;
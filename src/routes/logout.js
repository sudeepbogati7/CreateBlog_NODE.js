const express = require('express');

const router = express.Router();

router.post('/logout', async(req, res) => {
    res.json({sucess : true, message : "Successfully logged out !!"});
});


module.exports = router;
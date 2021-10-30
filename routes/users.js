const router=require('express').Router();
const {verifyToken} = require('../routes/verify');
const controllers = require('../controllers/controllers');

router.post("/",verifyToken,controllers.addAdminAndUser)
router.put("/",verifyToken,controllers.updateAdminAndUser);
router.get("/",verifyToken,controllers.viewAdmiAndUser);

module.exports=router;
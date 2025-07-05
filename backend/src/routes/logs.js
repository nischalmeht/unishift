const express=require("express")
const {
  getLogs,
  postLog,
  getLogsLevel,
} =require ("../controllers/logController.js");

const router = express.Router();

router.post("/", postLog);
router.get("/", getLogs);
router.get('/log', getLogsLevel);


// export default router;
module.exports=router
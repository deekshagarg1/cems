// const router = require("express").Router()
// const auth = require("../controllers/authController")

// router.post("/student/register",auth.studentRegister)

// router.post("/student/login",auth.studentLogin)

// for
// const { facultyLogin } = require("../controllers/facultyController"); 
// // ya jahan tumhara faculty controller hai

// router.post("/faculty/login", facultyLogin);







// module.exports = router


const router = require("express").Router();
const auth = require("../controllers/authController");

// ===== STUDENT =====
router.post("/student/register", auth.studentRegister);
router.post("/student/login", auth.studentLogin);

// ===== FACULTY =====
router.post("/faculty/register", auth.facultyRegister);
router.post("/faculty/login", auth.facultyLogin);


// ---- admin---------------
router.post("/admin/login", auth.adminLogin);

module.exports = router;
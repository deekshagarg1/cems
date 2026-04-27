
const router = require("express").Router();
const event = require("../controllers/eventController");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

// PUBLIC
router.get("/", event.getAllEvents);
router.get("/my-registrations", authMiddleware, event.getMyRegistrations);
router.get("/all-registrations", authMiddleware, event.getAllRegistrations);
router.get("/my-events", authMiddleware, event.getMyEvents);
router.get("/:id", event.getEventById);

// FACULTY
router.post("/create", authMiddleware, upload.single("image"), event.createEvent);
router.put("/update/:id", authMiddleware, upload.single("image"), event.updateEvent);
router.delete("/delete/:id", authMiddleware, event.deleteEvent);

// STUDENT
router.post("/register", authMiddleware, event.registerForEvent);

module.exports = router;
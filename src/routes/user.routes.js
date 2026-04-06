import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { logOutUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  (req, res, next) => {
    console.log("🔥 ROUTE HIT");
    next();
  },
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

//secured Routes
router.route("/logout").post(verifyJWT, logOutUser);
export default router;

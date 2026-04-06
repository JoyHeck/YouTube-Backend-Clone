import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";   
import { loginUser, registerUser } from "../controllers/user.controller.js";
const router = Router()

router.route("/register").post(
    (req, res, next) => {
        console.log("🔥 ROUTE HIT");
        next();
    },
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

router.route("/login").post(loginUser)

//secured Routes
router.route("//logouut").post(verifyJWT, logoutUser)
export default router;
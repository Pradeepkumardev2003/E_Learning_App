import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createOrder, // ✅ FIXED: Correct function name
  getAllPurchasedCourse,
  getCourseDetailWithPurchaseStatus,
  verifyWebhook, // ✅ FIXED: Correct function name
} from "../controllers/coursePurchase.controller.js";

const router = express.Router();

// 📌 Create Razorpay Order
router
  .route("/checkout/create-order") // ✅ Fixed route name
  .post(isAuthenticated, createOrder); // ✅ FIXED

// 📌 Handle Razorpay Webhook
router.route("/webhook").post(verifyWebhook); // ✅ FIXED

// 📌 Get Course Details with Purchase Status
router
  .route("/course/:courseId/detail-with-status")
  .get(isAuthenticated, getCourseDetailWithPurchaseStatus);

// 📌 Get All Purchased Courses
router.route("/").get(isAuthenticated, getAllPurchasedCourse);

export default router;

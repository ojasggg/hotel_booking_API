import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotel.controller.js";
import Hotel from "../models/hotel.model.js";

const router = express.Router();

// Create
router.post("/", createHotel);

// Update
router.put("/:id", updateHotel);

// Delete
router.delete("/:id", deleteHotel);

// Get
router.get("/:id", getHotel);

// Get all
router.get("/", getHotels);

export default router;

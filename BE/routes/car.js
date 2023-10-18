import express from "express";
const router = express.Router();
import {
  GET_ALL_CARS,
  ADD_CAR,
  GET_CAR_BY_ID,
  UPDATE_CAR,
  DELETE_CAR,
} from "../controller/car.js";

router.get("/cars", GET_ALL_CARS);

router.get("/cars/:id", GET_CAR_BY_ID);

router.post("/cars", ADD_CAR);

router.put("/cars/:id", UPDATE_CAR);

router.delete("/cars/:id", DELETE_CAR);

export default router;

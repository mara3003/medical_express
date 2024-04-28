import express from "express";
import { countAppointments, deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js";
import {isAdminAuthenticated, isPacientAuthenticated} from "../middleware/auth.js"

const router = express.Router();

router.post("/post",isPacientAuthenticated, postAppointment);
router.get("/getall",isAdminAuthenticated, getAllAppointments);
router.put("/update/:id",isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id",isAdminAuthenticated, deleteAppointment);
router.get("/count",isAdminAuthenticated, countAppointments);

export default router;
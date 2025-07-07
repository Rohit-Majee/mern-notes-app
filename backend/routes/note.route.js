import { Router } from "express";
import { addNote, deleteNote, getAllNotes, getNoteByID, updateNote } from "../controllers/note.controller.js";


const router = Router();

router.get("/", getAllNotes);

router.get("/:id", getNoteByID);

router.post("/", addNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

export default router;

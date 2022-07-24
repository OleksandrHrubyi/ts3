import express from "express";
const router = express.Router();
import { getAll, getById, createContact, rmContactById, updateContactsById, updateStatusFav } from "../../controllers/contacts";


router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", createContact);

router.put("/:contactId", updateContactsById);

router.patch("/:contactId/favorite", updateStatusFav);

router.delete("/:contactId", rmContactById);
export default router
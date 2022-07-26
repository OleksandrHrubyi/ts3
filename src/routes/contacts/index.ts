import express from "express";
const router = express.Router();
import { getAll, getById, createContact, rmContactById, updateContactsById, updateStatusFav } from "../../controllers/contacts";
import ctrlWrapper from "../../helper/ctrlWrapper.js";


router.get("/", ctrlWrapper(getAll));

router.get("/:contactId", ctrlWrapper(getById));

router.post("/", ctrlWrapper(createContact));

router.put("/:contactId", ctrlWrapper(updateContactsById));

router.patch("/:contactId/favorite", ctrlWrapper(updateStatusFav));

router.delete("/:contactId", ctrlWrapper(rmContactById));
export default router
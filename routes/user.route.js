import express from "express";


import {
    addUser,
    findUser,
    updateUser,
    userById
} from "../controllers/user.controller.js";
import { Authorize } from "../controllers/auth.controller.js";
import { isKaryawan } from "../middlerwares/roleValidations.js";

const app = express();

app.post("/", addUser);
app.put("/update/:id", updateUser);
app.get("/find/:id", userById);
app.get("/findwithfilter", findUser);

export default app; 
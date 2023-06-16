import wordsService from "./wordsService.js";
import express from "express";
import { keycloakClient } from "../../utils/keycloakClient.js";

const router = express.Router();

router.get("/", keycloakClient.protect(), async (req, res) => {
    // console.log(`GET /words`, req.headers);
    //read user info from kauth
    // console.log(req.kauth.grant.access_token.content);
    res.json(await wordsService.getAll());
});

//post only for admin
router.post("/", keycloakClient.protect(
    (token) => {
        // console.log(token);
        return !token.hasRole("admin")}
), express.json(), async (req, res) => {
    // console.log(`POST /words`, req.headers);
    // console.log(req.kauth.grant.access_token.content);
    try {
        res.json(await wordsService.add(req.body.word));
    } catch(e) {
        res.status(409).json({message: e.message});
    }
});

export default router;
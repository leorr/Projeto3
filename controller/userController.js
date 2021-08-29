import express from "express";
import { check, validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
const router = express.Router();

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            password
        } = req.body;
        try {
            let user = await User.findOne({
               username 
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }//verifica de username já foi pego

            user = new User({
                username,
                password
            });// se não constroi novo objeto user com os parametros recebidos pela api

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);//criptografia de senha

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };//payload p/ gerar token de acesso

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );//gera e retorna token
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

export default router;

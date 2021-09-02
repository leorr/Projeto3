import express from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import auth from "../config/auth.js";

const router = express.Router();

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

router.post(
	"/login",
	[
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

		const { username, password } = req.body;
		try {
			let user = await User.findOne({username});
			if (!user)
				return res.status(400).json({
					message: "User Not Exist"
				});

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({
					message: "Incorrect Password !"
				});

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				"randomString",
				{
					expiresIn: 3600
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						token
					});
				}
			);
		} catch (e) {
			console.error(e);
			res.status(500).json({
				message: "Server Error"
			});
		}
	}
);

router.get("/me", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		res.json(user._id);
	} catch (e) {
		res.send({ message: "Error in Fetching user" });
	}
});

export default router;

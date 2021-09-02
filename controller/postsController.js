import express from "express";
import { check, validationResult} from "express-validator";
import auth from "../config/auth.js";
import Posts from "../model/Posts.js";
import User from "../model/User.js"

const router = express.Router();

router.post(
	"/upload",
	[
		check("title", "Please Enter a Valid Title")
		.not().isEmpty(),
		check("content", "Please enter a valid password")
		.not().isEmpty()
	],
	auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		const {
			title,
			content
		} = req.body;
		try {
			const user = await User.findById(req.user.id);
			const userId = user.id;
			let post = await Posts.findOne({title});
			if (post) {
				return res.status(400).json({ msg: "Title Already Exists"	});
			}
			post = new Posts({
				title,
				content,
				userId
			});
			await post.save();
			res.json("Upload Successful"+post)
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Error in Uploading");
		}
	}
);

router.post(
	"/search",
	auth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array()
			});
		}
		try {
			const user = await User.findById(req.user.id);
			const userId = user.id;
			const busca =  await Posts.find({userId})
			const searchString = req.body;
			var condition = new RegExp(Object.values(searchString));
			var resultado = busca.filter(function (el) {
				return condition.test(el.title);
			});
			if (resultado) {
				return res.json(resultado);
			} else {
				res.json("Title not found")
			}
		} catch (err) {
			console.log(err.message);
			res.status(500).send("Error in searching");
		}
	}
);


export default router;

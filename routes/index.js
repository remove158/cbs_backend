const express = require("express");
const router = express.Router();
const mongoose = require("../config/db");
const Cat = mongoose.model("Cat", { name: String });
/* GET home page. */


router.get("/", async function (req, res, next) {
    let data = await mongoose.model("Cat").find();

	res.set(
		"Content-Security-Policy",
		"default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'"
	).render("index.ejs", { title: "Welcome ", data : data });
});

router.post("/post/", async function (req, res, next) {
    let data ={ name : true}
	if (req.body.action == "SEND") {
		let kitty = new Cat({ name: req.body.editor1 });
		// save ลง database (return เป็น Promise)
		kitty.save().then(() => console.log("Created Cat !"));
		const s = true;
		if (s) {
			// save ลง database (return เป็น Promise)
       
            data =kitty
		} else {
			const err = { status: 404, message: "Not found !" };
			next(err);
		}
	} else {
		 data = await mongoose.model("Cat").deleteMany();
	}
 
	res.redirect('/')
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('../config/db')
const Cat = mongoose.model("Cat", { name: String });
/* GET home page. */
router.get('/', function(req, res, next) {
    

    let kitty = new Cat({ name: "JavaScript" });
	// save ลง database (return เป็น Promise)
	kitty.save().then(() => console.log("Created Cat !"));
	const s = true;
	if (s) {
		// save ลง database (return เป็น Promise)

		res.send({ node: ` ${process.env.NODE_ENV}  🐹  ` , kitty });
	} else {
		const err = { status: 404, message: "Not found !" };
		next(err);
	}
});

module.exports = router;

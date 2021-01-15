let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

let indexRouter = require('./routes/index');


let app = express();

require("dotenv").config();
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);


app.use('/static', express.static(path.join(__dirname, 'public')))


// throws bad request (400)
app.use((err, req, res, next) => {
	if (err.status) {
		res.status(err.status);
	}else{
        res.status(400);
    }
	return res.json({
		title: "Error ,  💁🏿 ",
		message:
			process.env.NODE_ENV === "production"
				? "Somthing went wrong  , 🐹 !"
				: err.message,
	});
});

module.exports = app;

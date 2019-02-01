'use strict';

class ErrorManagement extends Error{
	constructor (error){
		super();
		switch(error.name) {
			case "ValidationError" : this.statusCode = 401;
			// case "TypeError" : this.statusCode = 400;
		}

		this.name = this.constructor.name;
		this.type = error.name;
		this.message = error.details[0].message;
		this.extendedInfo = error.message;
		this.detail = error.details;

		Error.captureStackTrace(this,this.constructor);
	}
}

const errorMessage = async (err,req,res,next) => {
	const schema = {
		"type": err.type || err.name,
		"message": err.message
	}
	console.log(err);
	await res.status(err.statusCode || 500).send(schema || "hola");
};


module.exports = {
	ErrorManagement,
	errorMessage
};
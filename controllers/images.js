'use stric';

const Images = require('../models').Images;
const Joi = require('joi');

module.exports = {
	uploadImage(req, res){
		console.log(req);
		if (Object.keys(req.files).length == 0) {
	    	return res.status(400).send('No files were uploaded.');
	  	}

	  	// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		let sampleFile = req.files.image;

		// Create unique bucket name
		const bucketName = "lmexpedition";
		// Create name for uploaded object key
		const keyName = 'images/'+req.files.image.name;

		// Create params for putObject call
	    const objectParams = {Bucket: bucketName, keyName: keyName, file: req.files.image.data, ACL: 'private'};

	    // Create headers 
	    const headers = {'x-api-key':"YOUR_API_KEY"};

		request.post({url:'https://1oh08imqy7.execute-api.us-east-1.amazonaws.com/final/uploadFile',headers:headers, form: JSON.stringify(objectParams)}, 
		(err,httpResponse,body)=>{

			let asd = body.split("?");
			const url = asd[0];

			const file = {
				server: "aws",
				fileName: keyName.toString(),
				url: url
			};
			req.local.file = file;
		});
	},

	createImage(req, res) {
		return Joi.object().keys({
			name: Joi.string().empty().required(),
			server: Joi.string().empty().required(),
			url: Joi.string().uri().empty().required(),
			email: Joi.string().email().empty().optional(),
			review: Joi.string().empty().optional(),
			facebook: Joi.string().uri().empty().optional(),
			status: Joi.number().integer().min(1).required()
		})
		.validate(req.body, {escapeHtml: true})
		.then(data => Images.create(data))
		.then(result => res.json(result))
		.catch(error => res.send(error));
	},
	findAllImages(req, res) {
		return Images
	    .findAll()
	    .then(result => res.json(result))
	    .catch(error => res.send(error));
	},
	findImageByPk(req, res) {
		return Joi.object().keys({
			imageId: Joi.number().integer().min(1).required()
		})
		.validate(req.params, {escapeHtml: true})
		.then(data => Images.findByPk(data.imageId))
		.then(result => res.json(result))
		.catch(error => res.send(error));
	},
	updateStatus(req, res) {
		const schema = Joi.object().keys({
			status: Joi.number().integer().min(1).required()
		});

		return Joi.object().keys({
			imageId: Joi.number().integer().min(1).required()
		})
		.validate(req.params, {escapeHtml: true})
		.then(data => schema.validate(req.body, {escapeHtml: true}))
		.then(data => Images.update({
				status: data.status
		}, {
			where: {
				id: req.params.imageId
			}
		}))
		.then(result => res.json(result))
		.catch(error => res.send(error));
	},
	updateImage(req, res) {
		const schema = Joi.object().keys({
			name: Joi.string().empty().optional(),
			server: Joi.string().empty().optional(),
			url: Joi.string().uri().empty().optional(),
			email: Joi.string().email().empty().optional(),
			review: Joi.string().empty().optional(),
			facebook: Joi.string().uri().empty().optional()
		});

		return Joi.object().keys({
			imageId: Joi.number().integer().min(1).required()
		})
		.validate(req.params, {escapeHtml: true})
		.then(data => schema.validate(req.body, {escapeHtml: true}))
		.then(data => Images.update(data, {
			where: {
				id: req.params.imageId
			}
		}))
		.then(result => res.json(result))
		.catch(error => res.send(error));
	},
	destroyImage(req, res){
	    return Joi.object().keys({
	      imageId: Joi.number().integer().min(1).required()
	    })
	    .validate(req.params, {escapeHtml: true}) 
	    .then(data => Images.destroy({
	        where: {
	          id: data.imageId
	        }
	    }))
		.then(result => res.json(result))
		.catch(error => res.send(error));
	}
}
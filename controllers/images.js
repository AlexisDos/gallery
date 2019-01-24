'use stric';

const Images = require('../models').Images;
const Joi = require('joi');

module.exports = {
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
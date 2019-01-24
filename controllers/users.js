'use strict';

const User = require('../models').User;
const sequelize = require('../models').sequelize;
const Joi = require('joi');

module.exports = {
	createUser(req, res){
		const schema = Joi.object().keys({
			username: Joi.string().empty().required(),
			password: Joi.string().empty().required(),
			firstName: Joi.string().empty().required(),
			lastName: Joi.string().empty().required()
		})

		.validate(req.body, {escapeHtml: true})
		.then(data => User.findOrCreate({
			where: {
				username: data.username
			},
			defaults: data
		}))
		.then(([result, created]) => {
			if(created === false){ res.send('usuario duplicado');}
				res.json(result);
		})
		.catch(error => res.send(error));
	},

	findAllUsers(req, res){
		return User
		.findAll()
		.then(result => res.json(result))
		.catch(error => res.send(error));
	},

	findUserByPk(req, res){
		const schema = Joi.object().keys({
			userId: Joi.number().integer().min(1).required(),
		})

		return schema.validate(req.params, {escapeHtml: true})
		.then(data => User.findByPk(data.userId))
		.then(result => res.json(result))
		.catch(error => res.send(error));
	},

	updateUser(req, res){
		const schema = Joi.object().keys({
			username: Joi.string().empty().optional(),
			password: Joi.string().empty().optional(),
			firstName: Joi.string().empty().optional(),
			lastName: Joi.string().empty().optional()
		})

		return Joi.object().keys({
			userId: Joi.number().integer().min(1).required()
		})
		.validate(req.params, { escapeHtml: true })
		.then(data => schema.validate(req.body, { escapeHtml: true }))
		.then(data => {
			return sequelize.transaction(t => {
			return User.update(data, {
					where: { id: req.params.userId },
					transaction: t
				})
			})
		}).then(result => res.json(result))
			.catch(error => res.send(error));
	},

	destroyUser(req, res){
		return Joi.object().keys({
			userId: Joi.number().integer().min(1).required()
		})
		.validate(req.params, {escapeHtml: true})
		.then(data => User.destroy({
			where: {
				id: data.userId
			}
		}))
		.then(result => res.json(result))
		.catch(error => res.send(error));
	}

	
}
const Model = require('../models/users.model');

class UserService{ 

	constructor(){
		this.model = new Model;
	}

	/** 
	 * @param {string}[password]
	 * @returns {string}
	 * 
	 **/
	encoding(password) {
		console.log(password);
	}

	save(req, res){
		this.model.save(req, res);
	}

	update(req, res){
		this.model.update(req, res);
	}

	get(res){
		this.model.get(res);				
	}

	getUser(id, res){
		this.model.getUser(id, res);				
	}

	delete(id, res){
		this.model.delete(id, res);				
	}

	updatePass(req, res){
		this.model.updatePass(req, res);
	}

}

module.exports = UserService;

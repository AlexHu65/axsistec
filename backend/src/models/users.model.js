const mysqlConnection = require('../database');
const handler = require('../handlers/validations.handler');

class Users{ 


	db = null;
	

	constructor(){
		this.db = mysqlConnection;
	}

	save(req, res){

		const query = `
			CALL userAddOrEdit(?,?,?,?,?,?,?);
		`;

		const {email, user, password, gender} = req.body;
		// si no viene el id por el body
		let id = new Date().getTime();

		const date = new Date();
		const status = true;

		const Handler = new handler();
		let encodePass = Handler.encode(password);
	
		this.db.query(query, [id, email, user, encodePass, status, gender, date], (err, rows, fields) =>{
			if(!err){
				return res.json({status: 1, msg: 'Empleado guardado'});
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		});
	}

	update(req, res){

		let statusPass = 0;
		let encodePassUpdate = '';

		const query = `
		UPDATE users 
		SET email = ?, 
			user = ?, 
			gender = ?
		WHERE id = ?;
		`;

		const {id, email, user, gender} = req.body;

		// si encuentra la contrasena la actualizamos
		if(req.body.password){

			const Handler = new handler();
			encodePassUpdate = Handler.encode(req.body.password);

			const queryPass = `CALL editPass(?,?);`;

			this.db.query(queryPass, [id, encodePassUpdate], (err, rows, fields) =>{
				if(!err){
					statusPass = 1;
				}else{
					statusPass = -1; 
				}
			});
		}

		if(statusPass >= 0){
			this.db.query(query, [email, user,  gender, id], (err, rows, fields) =>{
				if(!err){
					return res.json({status: 1, msg: 'Empleado guardado'});
				}else{
					console.log(err.sqlMessage);
					return res.json({status: 0, msg: err.sqlMessage});
				}
			});
		}else{
			return res.json({status: 0, msg: 'Error al actualizar el usuario'});
		}
	
	}


	get(res){	

		this.db.query(`CALL getUsers()` , (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}

	getUser(id, res){	
		this.db.query('SELECT id, email, user, date, gender FROM users WHERE id = ? AND status = true' ,[id], (err, rows, fields) =>{
			if(!err){
				return res.json(rows[0]);
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})

	}

	delete(id, res){
		console.log('Id de lo que vamos a borrar', id);
		this.db.query('CALL deleteUser(?)' ,[id], (err, rows, fields) =>{
			if(!err){
				return res.json({status: 1, msg: 'Empleado eliminado'});
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		})
	}

	updatePass(req, res){

		const query = `
			CALL editPass(?,?);
		`;

		const {id, password} = req.body;
		const Handler = new handler();
		const encodePass = Handler.encode(password);
	
		this.db.query(query, [id, encodePass], (err, rows, fields) =>{
			if(!err){
				return res.json({status: 1, msg: 'Empleado guardado'});
			}else{
				return res.json({status: 0, msg: err.sqlMessage});
			}
		});

	}

}

module.exports = Users;

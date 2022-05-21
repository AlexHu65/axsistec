class Handlers{

	encode(data){
		let buff = new Buffer(data);
		let base64data = buff.toString('base64');
		return base64data;
	}

	decode(data){
		let buff = new Buffer(data, 'base64');
		let text = buff.toString('ascii');
		return text;
	}

}

module.exports = Handlers;
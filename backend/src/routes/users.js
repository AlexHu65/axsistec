const express = require('express');
const router = express.Router();
const serviceUser = require('../services/user.service');


// Llamamos el servicio
const service = new serviceUser();

//Models


router.get('/', (req, res) => {
	service.get(res);
});

router.get('/user/:id', (req, res) => {
	const {id} = req.params;
	service.getUser(id,res);
});



router.post('/api/users/save', (req, res) => {
	service.save(req,res);
});


router.post('/api/users/save', (req, res) => {
	service.delete(req,res);
});


router.put('/api/user/update/pass', (req, res) => {
	service.updatePass(req, res);
})


router.put('/api/user/update', (req, res) => {
	service.update(req, res);
})

router.delete('/api/user/delete/:id', (req, res) => {
	const {id} = req.params;
	service.delete(id, res);
})

module.exports = router;
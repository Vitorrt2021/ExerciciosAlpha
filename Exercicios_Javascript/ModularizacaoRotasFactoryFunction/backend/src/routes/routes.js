const router = require('express').Router();

const get = require('../controller/get');
const put = require('../controller/put');
const postController = require('../controller/post')
const deleteEmployee = require('../controller/delete')

router.get('/',get.default)
router.get('/month/:month',get.getForMonth);
router.get('/sector/:sector',get.getSector);
router.get('/ramal',get.getRamal);

router.post('/',postController.createEmployees)

router.delete('/:registrationNumber',deleteEmployee.deleteEmployee)

router.put('/:registrationNumber',put.changeData)

module.exports = router









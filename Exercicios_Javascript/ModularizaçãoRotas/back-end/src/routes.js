const router = require('express').Router();

const getBirthDays = require('./controller/getBirthdays');
const getDefault = require('./controller/getDefault')
const getSector = require('./controller/getSector')
const getRamal = require('./controller/getRamal')

router.get('/',getDefault.default)
router.get('/month/:month',getBirthDays.getForMonth);
router.get('/sector/:sector',getSector.getSector);
router.get('/ramal',getRamal.getRamal);


module.exports = router









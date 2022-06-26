import {Router} from 'express'
import CreateAccountController from '../controllers/create_account_controller'
import ExtractController from '../controllers/extract_controller'

const route = Router()

route.route('/accounts').post(new CreateAccountController().handler.bind(new CreateAccountController()))


route.route('/extract').post(new ExtractController().handler.bind(new ExtractController()))

export default route
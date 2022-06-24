import {Router} from 'express'
import CreateAccountController from '../controllers/create_account_controller'

const route = Router()

route.route('/accounts').post(new CreateAccountController().handler.bind(new CreateAccountController()))

export default route
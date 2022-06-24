import {Router} from 'express'
import CreateUserController from '../controllers/create_user_controller'

const route = Router()

route.route('/users').post(new CreateUserController().handler.bind(new CreateUserController()))

export default route
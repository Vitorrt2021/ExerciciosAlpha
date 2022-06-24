import {Router} from 'express'
import DepositController from '../controllers/deposit_controller'
import DraftController from '../controllers/draft_controller'
import TransferController from '../controllers/transfer_controller'

const route = Router()

route.route('/deposit').post(new DepositController().handler.bind(new DepositController()))

route.route('/draft').post(new DraftController().handler.bind(new DraftController()))

route.route('/transfer').post(new TransferController().handler.bind(new TransferController()))

export default route
import { v4 as uuidv4 } from 'uuid';
import ITransfer from '../model/transfer_model';
import ValidateTransfer from '../validator/transfer_validate'

export default class CreateDraft{
    execute(req: any){
        const transfer: ITransfer = {
            date: new Date().toISOString(),
            transaction_id: uuidv4(),
            type: 'transfer',
            value: req.value,
            origin_account: {
                "account": 222
            },
            destiny_account:{
                "account": 21
            }
        } 
        
        new ValidateTransfer().isValid(transfer)
        return transfer
    }    
}
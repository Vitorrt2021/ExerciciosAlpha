import { v4 as uuidv4 } from 'uuid';
import ITransaction from '../model/transaction_model';
import ValidateDraft from '../validator/draft_validate'

export default class CreateDraft{
    execute(req: any){
        const draft: ITransaction = {
            account: req.account,
            date: new Date().toISOString(),
            transaction_id: uuidv4(),
            type: 'draft',
            value: req.value
        } 
        
        new ValidateDraft().isValid(draft)

        return draft
    }    
}
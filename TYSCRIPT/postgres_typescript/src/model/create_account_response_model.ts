import IAccount from "./account_model";
import IUser from "./user_model";

interface CreateAccountResponse{
    user: Partial<IUser>,
    account: IAccount
}

export default CreateAccountResponse
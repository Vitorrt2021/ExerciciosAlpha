interface ExtractQuery{
    type: string 
    value: number 
    date: string 
    tax: number
    receive_transfer: string | null 
    origin_account: string 
    destiny_account: string 
  }

  export default ExtractQuery
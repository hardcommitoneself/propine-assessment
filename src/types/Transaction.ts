export enum TRANSACTIONTYPE {
    DEPOSIT = "DEPOSIT",
    WITHDRAWAL = "WITHDRAWAL"
}

export type Transaction = {
    timestamp: number;
    transaction_type: TRANSACTIONTYPE;
    token: string;
    amount: number;
}
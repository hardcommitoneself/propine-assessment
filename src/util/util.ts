import axios from 'axios';
import chalk from "chalk";
import { Transaction, TRANSACTIONTYPE } from "../types/Transaction";

export const findAllTokens = (transactions: Transaction[]) => {
    const uniqueTokens: string[] = [];

    transactions.filter(transaction => {
        if(uniqueTokens.find(token => token === transaction.token) === undefined) {
            uniqueTokens.push(transaction.token);
        }
    });

    return uniqueTokens;
}

export const tokenBalance = (transactions: Transaction[], token: string, date?: string) => {
    return transactions.filter(transaction => transaction.token === token && (date ? transaction.timestamp <= new Date(date).getTime() / 1000 : true)).reduce((acc, cur) => acc + (cur.transaction_type === TRANSACTIONTYPE.DEPOSIT ? cur.amount * 1 : cur.amount * -1), 0);
}

export const exchangeRate = async (token: string, currency: string) => {
    const res = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${token}&tsyms=${currency}&api_key=${process.env.CRYPTOCOMPARE_API_KEY}`);
    return res.data.USD as number;
}

export const showResult = (transactions: Transaction[], token: string, rate: number, date?: string) => {
    const balance = tokenBalance(transactions, token, date);
    console.log(chalk.cyan.bold(token), `${balance} ${chalk.yellow.bold(token)}`, `${balance * rate} ${chalk.yellow.bold('USD')}`);
}
import readlineSync from "readline-sync";
import chalk from "chalk";
import validator from 'validator';
import * as dotenv from 'dotenv';
import { parse } from "csv-parse";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from 'url';
import rdl from "readline";
import process from "process";

// spinner
import { Spinner } from "./util/Spinner";

// utils
import { findAllTokens, tokenBalance, exchangeRate, showResult } from "./util/util";

// types
import { TRANSACTIONTYPE, Transaction } from "./types/Transaction";

dotenv.config();

let transactions: Transaction[] = []; 

// run
const run = async () => {
  const tokens = findAllTokens(transactions);

  // get rate of each token
  const rates: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    rates.push(await exchangeRate(tokens[i], 'USD'));    
  }

  // set default option of CLI
  readlineSync.setDefaultOptions({
    prompt: chalk.cyan.bold('Propine-assessment$ ')
  });

  // loop prompt CLI
  try {
    // clear terminal
    rdl.clearScreenDown(process.stdout);
    console.log('transaction csv is loaded successfully! Enjoy propine CLI tool!');

    readlineSync.promptCLLoop({
        propine: function() {
          const token = readlineSync.question('Please enter token name: ', {
            limit: (input) => {
              if(tokens.find(token => token.toLocaleLowerCase() === input.toLocaleLowerCase()) || input === '') {
                return true;
              } else {
                return false;
              }
            }
          });

          const date = readlineSync.question('Please enter date (YYYY/MM/DD, YYYY-MM-DD): ', {
            limit: (input) => {
              if(validator.isDate(input) || input === '') {
                return true;
              } else {
                return false;
              }
            }
          });

          // option1 - given no parameters
          if(token === '' && date === '') {
            tokens.forEach((token, index) => {
              showResult(transactions, token.toUpperCase(), rates[index]);
            });
            return;
          }

          // option2 - given a token
          if(token !== '' && date === '') {
            const index = tokens.findIndex(t => t === token);
            showResult(transactions, token.toUpperCase(), rates[index]);
            return;
          }

          // option3 - given a date
          if(token === '' && date !== '') {
            tokens.forEach((token, index) => {
              showResult(transactions, token.toUpperCase(), rates[index], date);
            });
            return;
          }

          // option4 - given a date and a token
          const index = tokens.findIndex(t => t === token);
          showResult(transactions, token.toUpperCase(), rates[index], date);
        },
        exit: function() { 
          return true;
        }
    });
  } catch (error) {
    console.log(error);
  }
}

// init
// --- load csv file
const init = () => {
  console.log("app is starting initialization...");

  const spinner = new Spinner();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const csvPath = path.resolve(__dirname, '../public/transactions1.csv');
  const headers = ['timestamp', 'transaction_type', 'token', 'amount'];

  spinner.spin();
  fs.createReadStream(csvPath)
    .pipe(
      parse({ 
        delimiter: ',',
        from_line: 2,
        columns: headers 
      })
    )
    .on("data", function(row: Transaction) {
      // store date
      transactions.unshift(row);
    })
    .on("end", function() {
      spinner.stop();
      run();
    })
    .on("error", function(error) {
      spinner.stop();
      console.log('Unexpected error!', error.message);
    });
}

init();
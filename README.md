# propine-assessment
> Command line application that does following features.
> - Given no parameters, return the latest portfolio value per token in USD
> - Given a token, return the latest portfolio value for that token in USD
> - Given a date, return the portfolio value per token in USD on that date
> - Given a date and a token, return the portfolio value of that token in USD on that date

### Installation instructions

step 1: Install and switch to the correct version of Node using NVM
   ```sh
   nvm install
   ```
step 2: Install dependencies
   ```sh
   npm i
   ```
step 3: Start app
   ```sh
   npm run start
   ```

### Run instructions

step 1: Waiting till loading csv file is finished

   ![image](https://user-images.githubusercontent.com/104041595/209566073-fa3e9b77-9796-4a4d-b639-292b88618284.png)
step 2: Enter **propine** command
  
  ![image](https://user-images.githubusercontent.com/104041595/209566179-1e7afd9c-24c1-4c73-be69-f11f8c1ea526.png)
step 3: You might answer the question... 
  
  - if you press **enter** without answer, it(token or date) won't be given as a parameter.
  ![image](https://user-images.githubusercontent.com/104041595/209566417-051a4f8b-e4fb-49b0-abb3-aa62a269860f.png)
  
  - if you answer with only token, then... FYI, if you enter invalid token name, you might need to answer again...(check token name from available tokens     in csv file)
  ![image](https://user-images.githubusercontent.com/104041595/209566601-983251fd-30cc-494c-ae87-9b204deb153f.png)
  
  - if you answer with only date, then... FYI, validation check as well
  ![image](https://user-images.githubusercontent.com/104041595/209566738-a8ab8b33-e589-4d56-901b-95d18f7249c0.png)
  
  - if you answer with both token and date, then...
  ![image](https://user-images.githubusercontent.com/104041595/209566774-d2179fc2-2b45-4b65-85a6-59630f4853ad.png)
step 4: You can check infinitely.

step 5: If you want to exit the app, just enter **exit**

  ![image](https://user-images.githubusercontent.com/104041595/209566964-119295b4-b27f-4144-a171-eba2fd23f8ca.png)

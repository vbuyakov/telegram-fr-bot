
# How to start
```sh
nvm use
npm ci
cp .env-example .env

#Set you own parameters
vim .env 


#DEV

npm run dev

#PROD TO RUN NODEMON
npm run start

```
# Parameters

```yaml
ALLOWED_USERS='user1,user2,user3'
```

Keep it empty if you don't need any restrictions



# Plans to the feature
* If not entered commant - By default start gpt4 chat and stop it on enter enother command or by /stop
* Format dictionary outpuy
* Provide parameter to external vocabular api
* Save dictionary responce to external vocabular api (expected supabase )
* Get list of last records in vocabular API
* Firstly try to find word in the vocabular API
* ... HTML games to learn words ... may be better in separated bot
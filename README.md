# conmet-app
Conmet Mobile Web App

### Prerequisites
* Nodejs
* Yarn

### Deploying to staging

Run the following commands:
````
yarn install
.\deploy.bat staging 'COMMENT'
````
Here comment is what gets registered as the git comment on Azure for this deployment

### Deploying to production

Run the following commands:
````
yarn install
.\deploy.bat prod 'COMMENT'
````
Here comment is what gets registered as the git comment on Azure for this deployment

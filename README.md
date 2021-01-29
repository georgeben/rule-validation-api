# Rule-validation-api
![](https://github.com/georgeben/rule-validation-api/workflows/CI-CD-workflow/badge.svg)   
An API to validate that a piece of data matches a specified rule.

## Technologies
- Javascript
- Node.js
- Express.js 
- Docker

## Getting started
Follow the instructions given below to get this project up and running on your local machine.

### Prerequisites
Make sure you have the following installed:
- [Docker](https://docker.com)

### Installation
1. Clone this repository by running `git clone https://github.com/georgeben/rule-validation-api`
2. Change your directory to the project's directory by running `cd project_directory`
3. Run `docker build -t rule-validation-api .`
4. Run `docker run --rm -it -p 4002:4002 rule-validation-api`.
5. Access the app on `http://localhost:4002`

## Running tests
1. Run `npm install`
2. Run `npm test`

Or, if you are running the app in a container, you can run:
`docker exec -it app_container_name npm run test`

## NPM Scripts
- test: Run tests and also generate code coverage report.
- dev: Run the app in development mode. The app is restarted on any file change, which makes development a bit faster.
- lint: Lint code using ESLint
- start: Starts the app in production mode

## Author
Kurobara Benjamin George

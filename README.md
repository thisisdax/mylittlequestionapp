# WDI Project 2 - mylittlequestionapp (Voice)

Project 2 of WDI7 course. Project started as mylittlequestionapp, built as a mobile friendly platform to facilitate a better experience between the host and audience interaction.

## Getting Started

To get started, please git clone this repo and proceed to run npm install to get the necessary dependencies.
Open up a browser and type in 'localhost:3000', the program should be up and running.

### Prerequisites

The project has several dependencies, most prominently Node and Express, as well as MongoDB.
The following list the required dependencies for the project.
```
"bcryptjs": "^2.4.0",
"body-parser": "^1.15.2",
"connect-flash": "^0.1.1",
"dotenv": "^4.0.0",
"ejs": "^2.5.5",
"express": "^4.14.0",
"express-ejs-layouts": "^2.2.0",
"express-session": "^1.14.2",
"method-override": "^2.3.7",
"mongoose": "^4.7.7",
"morgan": "^1.7.0",
"nodemon": "^1.11.0",
"passport": "^0.3.2",
"passport-local": "^1.0.0"
```

Head over to https://nodejs.org/en/ to download and install node and npm on your system.
Once done, run 'npm install' on your terminal, in the directory where you forked and cloned this repo. This will install the required dependencies.


### How to Use

To use the app, you are required to register an account. Once you're done with registering an account, you may proceed to 'Create' or 'Join' a room.

You may join a room that has been created by someone else, provided you know the name of the room. The rooms are deliberately kept anonymous except only to the host. So to join a room, please get the name of the room from the host.

After joining a room, you may start posting questions regarding the topic that is being discussed. Your questions will be approved by the host before being put up for the rest of the users to vote. Users may choose to vote for questions that they wish to ask, and the more popular questions will go towards the top.

Creating a room makes you the host of the particular room, as the host you will be able to approve questions and submit a poll to the users that are currently in your room. You then can close the poll once you are happy with your results. You may also view your old polls that are closed, if you wish to.

## Live Version

The app has been deployed to http://mylittlequestionapp.herokuapp.com/

## Built With

What did you use to build it, list the technologies, plugins, gems, packages etc.

* [javascript]
* [node]
* [npm]
* [bootstrap]
* [bcryptjs]
* [body-parser]
* [connect-flash]
* [dotenv]
* [ejs]
* [express]
* [express-ejs-layouts]
* [express-session]
* [method-override]
* [mongoose]
* [morgan]
* [nodemon]
* [passport]
* [passport-local]


## Workflow

Used trello for simple tracking of features that needs to be available in the app.
https://trello.com/b/bLDRxyIR/mylittlequestionapp

## Authors

* **Dax Tan** - *Wrote this app for WDI7 Project 2* - [thisisdax](https://github.com/thisisdax)

## Acknowledgments

* Used bootstrap for styling

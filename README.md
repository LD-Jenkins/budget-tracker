# Budget Tracker App

Budget tracker application using Node.js, Mongoose.js, and Express.js. Fully functional while working offline.

# Project Description

This is a simple budget tracking app that allows you to add and subtract funds (or really any item that you need to track the quantity of). The app will even keep track of your transactions if you don't have an internet connection. If transactions are made while offline, once you return online the transactions made offline will be updated to the database.

The project uses Express.js for handling requests/responses and Mongoose.js for simple database storage of workout data. It also uses a service worker for caching/serving cached responses and indexedDB for storage of transactions made offline.

The project is part of a coding bootcamp so some starter files were given. My work includes setup of the service worker, manifest, and indexedDB logic as well as small tweaks to other files to implement the additional parts and pieces.

# Setup/Installation

## Local

First start by making sure all project files have been downloaded and dependencies installed. Everything should work out of the box without additional setup assuming you have MongoDB installed/running. Simply start up the server and navigate to localhost:3000. 

## Heroku

This project is also ready for deployment to Heroku using MongoDB Atlas.<br>
[Checkout my hosted app here!](https://budget-tracker-lj.herokuapp.com)


# Usage Instructions

Once up and running simply type in the name and amount of a transaction and click submit. 
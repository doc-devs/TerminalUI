<h1 align="center">

    ██╗ ██████╗ █████╗ ██████╗ ███████╗
    ██║██╔════╝██╔══██╗██╔══██╗██╔════╝
    ██║██║     ███████║██████╔╝█████╗
    ██║██║     ██╔══██║██╔══██╗██╔══╝
    ██║╚██████╗██║  ██║██║  ██║███████╗
    ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
</h1>
<p>
  <a href="https://www.npmjs.com/package/server" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/server.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

## Install

```sh
npm install
```

## Usage

1. Clone the repository TerminalUI
2. run ``` npm i ``` to install dependencies
3. create ```.env``` file and copy variable names from ```sample.env```. Then provide your own values
4. run ``` pkg . ``` to compile the executables for Windows, macOS or Linux
5. double click on a created file to run the app



## Run tests

```sh
npm run test
```
## # iCare [![.github/workflows/js-tests.yml](https://github.com/doc-devs/iCare-V2/actions/workflows/js-tests.yml/badge.svg)](https://github.com/doc-devs/iCare-V2/actions/workflows/js-tests.yml)

Urgent care patient queue system

## Deployments

dev: [Heroku](https://ii-care.herokuapp.com/userPortal)

## Team members

- Lorenzo Ortega
- Ayrat Gimranov
- Mark Thanadabouth

## Domain Modeling

![uml](./images/iCare3.jpg)

## Routes

[authRoutes](src/auth/authRoute.js)

Where user : Nurse, Doctor

<pre>
GET   /userPortal     home (P.O.L.)
POST  /signup         create a user
POST  /signin         signin with basic auth

</pre>

## Project Description

An app that can be used by front desk RN of an emergency department to accept and assign walk-in patients into queues based on priority of their symptoms.

## User Stories

Feature Tasks:

- " As a Nurse, I want to be able to create a new account, so that I can have Nurse-permission's for queue system"
- " As a Physician, I want to be able to create a new account, so that I can have Physician-permission's for queue system"
- " As a Nurse, I want input arriving patient information, so that I can queue them-up for the Physician "
- " As a Physician, I want to process patients based on priority-level, so that I can create a treat-plan "
- " As a Nurse, I want to be able to move patients to another queue, so that if the patient's condition worsens they can be seen faster"

## Software Requirements

[click Here](./requirements.md)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_


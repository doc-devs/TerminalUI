'use strict';

const handler = (message) => {
  let patientRaw = JSON.parse(message.Body);
  let patient= JSON.parse(patientRaw.Message);
  console.log(chalk.magenta('\nYou are assigned the following patient:\n'), patient);
}

module.exports = handler;
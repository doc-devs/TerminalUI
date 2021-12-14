'use strict';

const figlet = require('figlet');

const banner = () => {
  console.clear();
  console.log(chalk.red('\n\n==========================================\n'))
  console.log(chalk.cyan(figlet.textSync(' iCare', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 120,
    whitespaceBreak: true
  })));
  console.log(chalk.red('=========================================='))
  console.log(chalk.red.bgWhite('\n Welcome to iCare Queue Management System \n'));
}

module.exports = banner;
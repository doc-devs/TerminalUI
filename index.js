'use strict'


const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
global.rl = readline.createInterface({ input, output });
global.chalk = require('chalk');
require('./terminal/welcome')
const banner = require('./terminal/banner.js');

banner();

rl.emit('welcome');

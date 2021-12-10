'use strict'

const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
global.rl = readline.createInterface({ input, output });
const { welcome } = require('./terminal/welcome')

welcome()

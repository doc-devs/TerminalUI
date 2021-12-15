'use strict';

const nurseOptions = () => {

  new Promise((resolve) => {
    rl.question(chalk.blueBright(`\nWhat would you like to do next?\n\n${chalk.white(`[1] - add new patient\n[2] - sign off\n`)}`), (answer) => {
      resolve(answer);
    })
  }).then((data) => {
    if (data === '1') {
      rl.emit('nurse-questions');
    } else if (data === '2') {
      rl.close();
      console.log(chalk.cyan.bold('\nYou are signed off. Thank you for using iCare!\n\n'));
    } else {
      console.log(chalk.red('\nInvalid input. Please choose a number and press ENTER.\n'))
      rl.emit('nurse-options');
    }
  }).catch((e) => {
    console.log(e)
  })
}

rl.on('nurse-options', ()=>{
  nurseOptions();
})



module.exports = { nurseOptions }

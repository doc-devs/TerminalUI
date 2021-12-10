'use strict';

const nurseOptions = () => {

  new Promise((resolve) => {
    rl.question('\nWhat would you like to do next?\n\n[1] - add new patient\n[2] - sign off\n', (answer) => {
      resolve(answer);
    })
  }).then((data) => {
    if (data === '1') {
      rl.emit('nurse-questions');
    } else if (data === '2') {
      rl.close();
      console.log('Goodbye from iCare');
    } else {
      console.log('\nInvalid input. Please choose a number and press ENTER.\n')
      welcome2()
    }
  }).catch((e) => {
    console.log(e)
  })

}



module.exports = { nurseOptions }

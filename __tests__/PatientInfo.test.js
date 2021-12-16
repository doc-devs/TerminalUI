
const {PatientInfo} = require('../terminal/nurse/PatientInfo');

describe('PatientInfo', ()=>{
  
  it('creates a patient info oject with a given data', () => {
    let data = {
      name: 'test pt',
      age: '35',
      symptoms: 'test symptoms',
      topic: 'test topic',
      queue: 'test queue',
      screenedBy: 'test nurse'
    }

    let pt = new PatientInfo(data)
    expect(pt.name).toEqual(data.name)
    expect(pt.age).toEqual(data.age)
    expect(pt.symptoms).toEqual(data.symptoms)
    expect(pt.topic).toEqual(data.topic)
    expect(pt.queue).toEqual(data.queue)
    expect(pt.screenedBy).toEqual(data.screenedBy)
  });
})
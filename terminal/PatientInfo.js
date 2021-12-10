'use strict';

class PatientInfo {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
    this.symptoms = data.symptoms;
    this.topic = data.topic;
  }
}

let ptData = {};

module.exports = {PatientInfo, ptData};
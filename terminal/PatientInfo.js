'use strict';

class PatientInfo {
  constructor(data) {
    this.name = data.name;
    this.age = data.age;
    this.symptoms = data.symptoms;
    this.topic = data.topic;
    this.queue = data.queue;
    this.screenedBy = data.screenedBy;
  }
}

let ptData = {};

module.exports = {PatientInfo, ptData};
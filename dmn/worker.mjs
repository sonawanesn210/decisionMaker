//tried from video
//https://youtu.be/LInjBKQGGHI

import { Client, logger, Variables } from 'camunda-external-task-client-js';

const config = {
  baseUrl: 'http://192.168.29.254:8080/engine-rest',
  use: logger,

};

const client = new Client(config);

client.subscribe('check-action', async function ({ task, taskService }) {
  try {
    console.log('handling check-action...')
    const localVariables = new Variables();
    localVariables.set("type", 'holidayCheck');
    await taskService.complete(task, localVariables);
    console.log('done check-action')
  } catch (err) {
    console.log(err);
  }
});

client.subscribe('HolidayCheck', async function ({ task, taskService }) {
  console.log('handling HolidayCheck')
  console.log(task.variables.getAll());
  const localVariables = new Variables();
  localVariables.set("isHoliday", 'Yes');
  await taskService.complete(task, localVariables);
  console.log('done HolidayCheck')
});

client.start();

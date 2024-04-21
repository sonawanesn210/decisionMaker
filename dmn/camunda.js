/* //not working
require('@babel/register')({
    presets: ['@babel/preset-env']
  });
  
  const { Client, logger } = require('camunda-external-task-client-js');

// Configure the client
const config = {
  baseUrl: 'http://localhost:8080/engine-rest',
  use: logger,
};

// Create a client instance
const client = new Client(config);

// Define the topic for the external task
const topic = 'packing-decision';

// Define the task worker function
async function handleTask({ task, taskService }) {
  // Retrieve the input variables from the task
  const isHoliday = task.variables.isHoliday;

  // Make the decision based on the holiday condition
  let packingDecision;
  if (isHoliday) {
    packingDecision = 'Pack for a trip';
  } else {
    packingDecision = 'Pack for the office';
  }

  // Complete the task with the decision result
  await taskService.complete(task, { packingDecision });
}

// Subscribe to the external task topic and handle the tasks
client.subscribe(topic, handleTask);
 */









/////////////////////////////////////////////////////
/* require('@babel/register')({
  presets: ['@babel/preset-env']
});
const DmnEngine = require('camunda-dmn-js').default;
//const DmnEngine = require('camunda-dmn-js').default;

// Define the DMN table XML
const decisionTableXml = `
  <definitions xmlns="http://www.omg.org/spec/DMN/20151101/dmn.xsd" id="definitions" name="Decision Table" namespace="http://camunda.org/schema/1.0/dmn">
    <decision id="decision" name="My Decision">
      <decisionTable id="decisionTable">
        <input id="input1" label="Meal">
          <inputExpression id="inputExpression1" typeRef="string">
            <text>meal</text>
          </inputExpression>
        </input>
        <output id="output1" label="Preparation" name="preparation" typeRef="string"/>
        <rule id="rule1">
          <inputEntry id="inputEntry1">
            <text>chicken</text>
          </inputEntry>
          <outputEntry id="outputEntry1">
            <text>Prepare chicken</text>
          </outputEntry>
        </rule>
        <rule id="rule2">
          <inputEntry id="inputEntry2">
            <text>salad</text>
          </inputEntry>
          <outputEntry id="outputEntry2">
            <text>Prepare salad</text>
          </outputEntry>
        </rule>
      </decisionTable>
    </decision>
  </definitions>
`;

// Define the input context
const context = {
  meal: 'chicken' // or 'salad'
};

// Create an instance of the DmnEngine and load the DMN table
const dmnEngine = new DmnEngine();
const decisionTable = dmnEngine.parseDecisionTable(decisionTableXml);

// Evaluate the decision table with the input context
const result = decisionTable.evaluate(context);

// Access the result of the decision evaluation
console.log(result.outputs[0].value); // Output: Prepare chicken or Prepare salad
 */
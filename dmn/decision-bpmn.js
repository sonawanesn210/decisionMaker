
const { evaluateDecisionTable } = require('dmn-engine');
const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

async function evaluateDecision() {
  try {
    const bpmnFilePath = path.join(__dirname, 'decision_process.bpmn');
    const bpmnXml = fs.readFileSync(bpmnFilePath, 'utf-8');

    // Parse the BPMN XML
    const result = await parseStringPromise(bpmnXml);
console.log( result['bpmn:definitions']['bpmn:process'][0]['bpmn:exclusiveGateway'][0])
    // Check if 'bpmn:sequenceFlow' is present in the parsed XML
  // Check if 'bpmn:sequenceFlow' is present in the parsed XML
  const exclusiveGateway = result['bpmn:definitions']['bpmn:process'][0]['bpmn:exclusiveGateway'][0];
  const outgoingElements = exclusiveGateway['bpmn:outgoing'];

  // Convert outgoingElements to an array
  const sequenceFlows = Array.isArray(outgoingElements) ? outgoingElements : [outgoingElements];
console.log("sequenceFlows",sequenceFlows)
const conditionExpressions = sequenceFlows.map((sequenceFlow) => {
    const id = sequenceFlow;
    const conditionExpressionElement = result['bpmn:definitions']['bpmn:process'][0]['bpmn:sequenceFlow'].find((elem) => elem.$.id === id);
    const conditionExpression = conditionExpressionElement['bpmn:conditionExpression']?.[0]._.trim() || '';
    return { id, conditionExpression };
  });
console.log("conditionExpressions",conditionExpressions)

 // Get the condition expression for a specific sequence flow ID ('chicken-path')
 const desiredSequenceFlowId = 'chicken-path';
 const desiredResult = conditionExpressions.find((expr) => expr.id === desiredSequenceFlowId);
 console.log("Desired Result:", desiredResult);
  } catch (error) {
    console.error('DMN Evaluation Error:', error);
  }
}

// Helper function to parse XML using Promise

function parseStringPromise(xml) {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

evaluateDecision();

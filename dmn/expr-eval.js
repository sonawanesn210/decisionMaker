var Parser = require('expr-eval').Parser;

var parser = new Parser();
var expr = parser.parse('2 * x + 1');
console.log(expr.evaluate({ x: 3 })); // 7

// or
Parser.evaluate('6 * x', { x: 7 }) // 42


// const { Engine } = require('json-rules-engine');

// const sequenceFlows = [
//   {
//     id: 'chicken-path',
//     name: 'Chicken',
//     sourceRef: 'meal-gateway',
//     targetRef: 'prepare-chicken',
//     conditionExpression: {
//       type: 'bpmn:tFormalExpression',
//       body: '= meal = "chicken"'
//     }
//   },
//   {
//     id: 'salad-path',
//     name: 'Salad',
//     sourceRef: 'meal-gateway',
//     targetRef: 'prepare-salad',
//     conditionExpression: {
//       type: 'bpmn:tFormalExpression',
//       body: '= meal = "salad"'
//     }
//   }
// ];

// const mealDecisionRules = sequenceFlows.map((flow) => {
//     const conditionValue = flow.conditionExpression.body.match(/"([^"]+)"/)[1];
//     const conditionPath ='$.meal';
    
//   console.log("conditionPath",conditionPath,"conditionValue",conditionValue)

//   return {
//     conditions: {
//       all: [
//         {
//           fact: 'meal',
//           path: conditionPath,
//           operator: 'equal',
//           value: conditionValue
//         }
//       ]
//     },
//     event: { type: flow.targetRef }
//   };
// });
// //console.log("conditions",conditions)
// async function makeMealDecision(meal) {
//   const engine = new Engine();

//   mealDecisionRules.forEach((rule) => {
//     engine.addRule(rule);
//   });

//   engine.addFact('meal', meal);
// //console.log("engine.addFact('meal', meal);",engine.addFact('meal', meal))
//   const { events } = await engine.run();

//   const decisionEvent = events[0];
//   console.log("decisionEvent",decisionEvent)
//   if (decisionEvent) {
//     return ` ${decisionEvent.type}.`;
//   } else {
//     return 'No matching rule found.';
//   }
// }

// // Usage example
// const meal = {
//   meal: 'chicken'
// };

// makeMealDecision(meal)
//   .then((decision) => {
//     console.log('Decision:', decision);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });



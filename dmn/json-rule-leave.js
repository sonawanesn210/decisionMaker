// const express = require('express');
// const { Engine } = require('json-rules-engine');

// const app = express();
// app.use(express.json());

// async function makeLeaveDecision(leave) {
//   const engine = new Engine();

//   const ruleApproved = {
//     conditions: {
//       all: [{
//         fact: 'leave',
//         path: '$.approved',
//         operator: 'equal',
//         value: true
//       }]
//     },
//     event: { type: 'go-on-holiday' }
//   };
  
//   const ruleNotApproved = {
//     conditions: {
//       all: [{
//         fact: 'leave',
//         path: '$.approved',
//         operator: 'equal',
//         value: false
//       }]
//     },
//     event: { type: 'go-to-office' }
//   };
  

//   engine.addRule(ruleApproved);
//   engine.addRule(ruleNotApproved);

//   engine.addFact('leave', leave);

//   const { events } = await engine.run();
//    console.log("events",events)
//   const decisionEvent = events[0];
//   console.log("decisionEvent",decisionEvent)
//   if (decisionEvent.type === 'go-on-holiday') {
//     return 'Leave approved. Going on a holiday!';
//   } else {
//     return 'Leave not approved. Going to the office.';
//   }
// }

// app.post('/make-leave-decision', async (req, res) => {
//   const leave = req.body;
//   const decision = await makeLeaveDecision(leave);
//   res.json({ decision });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


// const { Engine } = require('json-rules-engine');

// const mealDecisionRules = [
//   {
//     conditions: {
//       all: [
//         {
//           fact: 'meal',
//           path: '$.meal',
//           operator: 'equal',
//           value: 'chicken'
//         }
//       ]
//     },
//     event: { type: 'prepare-chicken' }
//   },
//   {
//     conditions: {
//       all: [
//         {
//           fact: 'meal',
//           path: '$.meal',
//           operator: 'equal',
//           value: 'salad'
//         }
//       ]
//     },
//     event: { type: 'prepare-salad' }
//   }
// ];

// async function makeMealDecision(meal) {
//   const engine = new Engine();

//   mealDecisionRules.forEach((rule) => {
//     engine.addRule(rule);
//   });

//   engine.addFact('meal', meal);

//   const { events } = await engine.run();

//   const decisionEvent = events[0];
//   //console.log("decisionEvent===>",engine.addFact('meal', meal))
//   if (decisionEvent.type === 'prepare-chicken') {
//     return 'Preparing chicken.';
//   } else if (decisionEvent.type === 'prepare-salad') {
//     return 'Preparing salad.';
//   } 
// }

// // Usage example
// const meal = {
//   meal: 'salad'
// };

// makeMealDecision(meal)
//   .then((decision) => {
//     console.log('Decision:', decision);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   }); 

  

const express = require('express');
const { Engine } = require('json-rules-engine');

const sequenceFlows = [
  {
    id: 'chicken-path',
    name: 'Chicken',
    sourceRef: 'meal-gateway',
    targetRef: 'prepare-chicken',
    conditionExpression: {
      type: 'bpmn:tFormalExpression',
      body: '= meal = "chicken"'
    }
  },
  {
    id: 'salad-path',
    name: 'Salad',
    sourceRef: 'meal-gateway',
    targetRef: 'prepare-salad',
    conditionExpression: {
      type: 'bpmn:tFormalExpression',
      body: '= meal = "salad"'
    }
  }
];

const mealDecisionRules = sequenceFlows.map((flow) => {
  const conditionValue = flow.conditionExpression.body.match(/"([^"]+)"/)[1];
  const conditionPath ='$.meal';
  console.log("conditionValue",conditionValue)
  return {
    conditions: {
      all: [
        {
          fact: 'meal',
          path: conditionPath,
          operator: 'equal',
          value: conditionValue
        }
      ]
    },
    event: { type: flow.targetRef }
  };
});

async function makeMealDecision(meal) {
  const engine = new Engine();

  mealDecisionRules.forEach((rule) => {
    engine.addRule(rule);
  });

  engine.addFact('meal', meal);
console.log(" engine.addFact('meal', meal);", engine.addFact('meal', meal))
  const { events } = await engine.run();

  const decisionEvent = events[0];
  if (decisionEvent) {
    return `decision for ${decisionEvent.type}.`;
  } else {
    return 'No matching rule found.';
  }
}

const app = express();
app.use(express.json());

app.post('/make-leave-decision', async (req, res) => {
  try {
    const { meal } = req.body;
    if (!meal) {
      return res.status(400).json({ error: 'Meal parameter is required.' });
    }

    const decision = await makeMealDecision(meal);
    res.json({ decision });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

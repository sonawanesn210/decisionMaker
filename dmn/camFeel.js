const { feelExpressionLanguage } = require('dmn-eval-feel');

// Define the decision table as a JSON object
const decisionTable = {
  decisionTable: {
    inputs: [
      {
        inputExpression: {
          text: 'meal',
          typeRef: 'string'
        }
      }
    ],
    outputs: [
      {
        outputName: 'preparation',
        typeRef: 'string'
      }
    ],
    rules: [
      {
        inputEntries: [
          {
            text: 'chicken'
          }
        ],
        outputEntries: [
          {
            text: '"Prepare chicken"'
          }
        ]
      },
      {
        inputEntries: [
          {
            text: 'salad'
          }
        ],
        outputEntries: [
          {
            text: '"Prepare salad"'
          }
        ]
      }
    ]
  }
};

// Define the input context
const context = {
  meal: 'chicken' // or 'salad'
};

// Evaluate the decision table using FEEL
const feelResult = feelExpressionLanguage.evaluate(decisionTable, context);

// Access the result of the decision evaluation
const preparation = feelResult.output.preparation;
console.log(preparation); // Output: Prepare chicken or Prepare salad

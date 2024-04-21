const express =require('express');
const jexl = require('jexl');

// const someNumber = 10
// const expression = jexl.expr`5 + ${someNumber}`
// console.log(expression.evalSync()) // 15

const { expr } = jexl
jexl.addTransform('double', (val) => val * 2)
const expression = expr`2|double`
console.log(expression.evalSync()) // 4
const app = express()
app.use(express.json())


async function makeLeaveDecision(leave) {
  jexl.addTransform('decision', (approved) => {
    if (approved) {
      return 'Leave approved. Going on a holiday!';
    } else {
      return 'Leave not approved. Going to the office.';
    }
  });

  const expression = jexl.expr`${leave.approved}|decision`;

  const decision = await expression.eval();

  return decision;
}

// const leaveData = {
//   approved: false
// };

// makeLeaveDecision(leaveData)
//   .then(decision => {
//     console.log(decision);
//   })
//   .catch(err => {
//     console.error(err);
//   });

  app.post('/make-leave-decision',async(req,res) =>{
    const leave = req.body;
    const decision = await makeLeaveDecision(leave);
    console.log("decision is here",{decision})
    res.json({decision})
  })

  app.listen(3000, () =>{
    console.log('server is running on port 3000')
  })
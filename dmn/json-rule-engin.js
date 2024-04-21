//tried same as per their code snippet in different way

const { Engine } = require('json-rules-engine');

function checkIfUserCanAffordGiftCard(user, productList) {
  const engine = new Engine();
  
  const rule = {
    conditions: {
      all: [{
        fact: 'account',
        path: '$.balance',
        params: {
          accountType: 'customer'
        },
        operator: 'greaterThanInclusive',
        value: {
          fact: 'product',
          path: '$.price',
          params: {
            productId: 'giftCard'
          }
        }
      }]
    },
    event: { type: 'customer-can-afford-gift-card' }
  };
  
  engine.addRule(rule);
  
  engine.addFact('account', user.accounts.find(account => account.type === 'customer'));
  
  engine.addFact('product', productList.find(product => product.productId === 'giftCard'));
  
  return engine.run();
}

const productList = [
  { productId: 'giftCard', price: 50 },
  { productId: 'widget', price: 45 },
  { productId: 'widget-plus', price: 800 }
];

const users = [
  { userId: 'washington', accounts: [{ type: 'customer', balance: 500 }, { type: 'partner', balance: 0 }] },
  { userId: 'jefferson', accounts: [{ type: 'customer', balance: 30 }] }
];

users.forEach(async user => {
  const { events } = await checkIfUserCanAffordGiftCard(user, productList);
  const canAffordGiftCard = events.some(event => event.type === 'customer-can-afford-gift-card');
  
  if (canAffordGiftCard) {
    console.log(`${user.userId} CAN afford a gift card.`);
  } else {
    console.log(`${user.userId} CANNOT afford a gift card.`);
  }
});

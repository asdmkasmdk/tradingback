const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
  confirmation: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isConfirmed: {
    type: Boolean,
    required: true
  },
  stripeAccountId: {
    type: String,
    required: true
  },
  onboarding: {
    type: String,
  },
  isOnboarded: {
    type: Boolean,
    required: false,
  }
});
const Sell = mongoose.model('Sell', sellSchema);

async function createSell(confirmation, email, password, stripeAccountId) {
  const sell = new Sell({
    confirmation,
    email,
    password,
    isConfirmed: false,
    stripeAccountId,
    isOnboarded: false
  });
  const result = await sell.save();
  return result;
}
async function confirmSell(confirmation, onboarding) {
  await Sell.updateOne({ confirmation: confirmation }, {
    $set: {
      isConfirmed: true,
      onboarding: onboarding
    }
  });
}
async function getConfirmSellConfirmation(confirmation) {
  return await Sell.findOne({ confirmation: confirmation });
}
async function onboardSell(onboarding) {
  await Sell.updateOne({ onboarding: onboarding }, {
    $set: {
      isOnboarded: true
    }
  })
}

async function getSell(email) {
  return await Sell.findOne({ email: email });
}
module.exports.createSell = createSell;
module.exports.confirmSell = confirmSell;
module.exports.getConfirmSellConfirmation = getConfirmSellConfirmation;
module.exports.getSell = getSell;
module.exports.onboardSell = onboardSell;
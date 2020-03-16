const additionalShares = (sp500Price, goldPrice, bondPrice, spareCash) => {
  let additionalBondShares = 0;
  let additionalSpShares = 0;
  let additionalGoldShares = 0;

  if (Math.floor(spareCash / bondPrice) >= 1) {
    additionalBondShares = Math.floor(spareCash / bondPrice);
    spareCash -= additionalBondShares * bondPrice;
  }

  if (Math.floor(spareCash / sp500Price) >= 1) {
    additionalSpShares = Math.floor(spareCash / sp500Price);
    spareCash -= additionalSpShares * sp500Price;
  }

  if (Math.floor(spareCash / goldPrice) >= 1) {
    additionalGoldShares = Math.floor(spareCash / goldPrice);
  }

  return {
    SP500: additionalSpShares,
    Bonds: additionalBondShares,
    Gold: additionalGoldShares
  };
};

module.exports = (sp500Prie, goldPrie, bondPrie, spareCash) => {
  const targetAllocation = {
    SP500: 0.3,
    Bonds: 0.55,
    Gold: 0.15
  };

  const sp500P = Math.ceil(sp500Prie);
  const goldP = Math.ceil(goldPrie);
  const bondP = Math.ceil(bondPrie);

  const numSharesToBuy = {
    SP500: Math.floor((spareCash * targetAllocation["SP500"]) / sp500P),
    Bonds: Math.floor((spareCash * targetAllocation["Bonds"]) / bondP),
    Gold: Math.floor((spareCash * targetAllocation["Gold"]) / goldP)
  };

  const expenditures = {
    SP500: numSharesToBuy["SP500"] * sp500P,
    Bonds: numSharesToBuy["Bonds"] * bondP,
    Gold: numSharesToBuy["Gold"] * goldP
  };

  let leftoverCash =
    spareCash -
    Array.from(Object.values(expenditures)).reduce((a, b) => a + b, 0);

  let moreSharesToBuy = null;
  if (leftoverCash > 0)
    moreSharesToBuy = additionalShares(sp500P, goldP, bondP, leftoverCash);

  if (moreSharesToBuy) {
    Object.keys(moreSharesToBuy).forEach(k => {
      numSharesToBuy[k] += moreSharesToBuy[k];
    });
  }

  return numSharesToBuy;
};

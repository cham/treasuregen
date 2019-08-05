const rollDice = (numFaces, numRolls) => {
  let total = 0
  while (numRolls--) {
    total += rollDie(numFaces)
  }
  return total
}
const rollDie = numFaces => Math.ceil(Math.random() * numFaces)

const rollDiceForDefinition = (rollDef) => {
  const defParts = rollDef.split('d')
  return rollDice(parseInt(defParts[1]), parseInt(defParts[0]))
}

const gpConversionRatio = (coinType) => {
  if (coinType === 'cp') {
    return 0.01
  }
  if (coinType === 'sp') {
    return 0.1
  }
  if (coinType === 'ep') {
    return 0.5
  }
  if (coinType === 'pp') {
    return 10
  }
  return 1
}

const getTreasureTable = (type, cr) => require(`../data/table-${type}-${cr}.json`)

const getCoins = (coinEntries) => {
  const roll = rollDie(100)
  const coinEntry = coinEntries.filter(entry => entry['d100'] >= roll).shift()
  return Object.keys(coinEntry)
    .filter(coinType => coinType !== 'd100')
    .map((coinType) => {
      const amount = rollDiceForDefinition(coinEntry[coinType])
      return {
        coinType,
        amount,
        amountInGP: amount * gpConversionRatio(coinType)
      }
    })
}

const getTreasure = (type, cr) => {
  const table = getTreasureTable(type, cr)
  const coins = getCoins(table.coins)
  return { coins }
}

export { getTreasure }

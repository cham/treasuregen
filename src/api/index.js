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

const getTreasureTable = (type, cr) => require(`../data/table-${type}-${cr}.json`)

const getCoins = (coinEntries) => {
  const roll = rollDie(100)
  const coinEntry = coinEntries.filter(entry => entry['d100'] >= roll).shift()
  return Object.keys(coinEntry)
    .filter(coinType => coinType !== 'd100')
    .map(coinType => `${rollDiceForDefinition(coinEntry[coinType])} x ${coinType}`)
}

const getTreasure = (type, cr) => {
  const table = getTreasureTable(type, cr)
  const coins = getCoins(table.coins)
  return { coins }
}

export { getTreasure }

const getTreasureTable = (type, cr) => require(`../data/table-${type}-${cr}.json`)
const getGemTable = type => require(`../data/table-gems-${type}.json`)

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

const gpConversionRatio = (itemKey) => {
  if (itemKey === 'cp') {
    return 0.01
  }
  if (itemKey === 'sp') {
    return 0.1
  }
  if (itemKey === 'ep') {
    return 0.5
  }
  if (itemKey === 'pp' || itemKey === '10gp') {
    return 10
  }
  if (itemKey === '50gp') {
    return 50
  }
  return 1
}

const getEntry = (entries) => {
  if (!entries) {
    return {}
  }
  const roll = rollDie(100)
  const entry = entries.filter(entry => entry['d100'] >= roll).shift()
  return Object.keys(entry).filter(entryKey => entryKey !== 'd100').reduce((memo, key) => {
    memo[key] = entry[key]
    return memo
  }, {})
}

const getCoins = (coinEntries) => {
  const coinEntry = getEntry(coinEntries)
  return Object.keys(coinEntry)
    .map((coinType) => {
      const amount = rollDiceForDefinition(coinEntry[coinType])
      return {
        coinType,
        amount,
        amountInGP: amount * gpConversionRatio(coinType)
      }
    })
}

const gemTypeToFancy = (gemType) => {
  const roll = rollDie(12)
  const gemTable = getGemTable(gemType)
  return gemTable[roll-1]
}

const getGems = (gemEntries) => {
  const gemEntry = getEntry(gemEntries)
  return Object.keys(gemEntry)
    .map((gemType) => {
      const amount = rollDiceForDefinition(gemEntry[gemType])
      return {
        gemType: gemTypeToFancy(gemType),
        amount,
        amountInGP: amount * gpConversionRatio(gemType)
      }
    })
}

const getTreasure = (type, cr) => {
  const table = getTreasureTable(type, cr)
  const coins = getCoins(table.coins)
  const gems = getGems(table.gems)
  return { coins, gems }
}

export { getTreasure }

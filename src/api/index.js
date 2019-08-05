const getTreasureTable = (type, cr) => require(`../data/table-${type}-${cr}.json`)
const getGemTable = type => require(`../data/table-gems-${type}.json`)
const getArtTable = type => require(`../data/table-art-${type}.json`)
const getMagicTable = type => require(`../data/table-magic-${type}.json`)

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

const getEntry = (roll, entries) => {
  if (!entries) {
    return {}
  }
  const entry = entries.filter(entry => entry['d100'] >= roll).shift()
  return Object.keys(entry).filter(entryKey => entryKey !== 'd100').reduce((memo, key) => {
    memo[key] = entry[key]
    return memo
  }, {})
}

const gemTypeToFancy = (gemType) => {
  const roll = rollDie(12)
  const gemTable = getGemTable(gemType)
  return gemTable[roll-1]
}

const artTypeToFancy = (artType) => {
  const roll = rollDie(10)
  const artTable = getArtTable(artType)
  return artTable[roll-1]
}

const magicItemFromTable = (tableName) => {
  tableName = 'A'
  const magicTable = getMagicTable(tableName)
  const entry = getEntry(rollDie(100), magicTable)
  return entry.item
}

const getCoins = (roll, coinEntries) => {
  const coinEntry = getEntry(roll, coinEntries)
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

const getGems = (roll, gemEntries) => {
  const gemEntry = getEntry(roll, gemEntries)
  return Object.keys(gemEntry)
    .map((gemType) => {
      const amount = rollDiceForDefinition(gemEntry[gemType])
      return {
        gemType: `${gemTypeToFancy(gemType)}, ${gemType} each`,
        amount,
        amountInGP: amount * gpConversionRatio(gemType)
      }
    })
}

const getArt = (roll, artEntries) => {
  const artEntry = getEntry(roll, artEntries)
  return Object.keys(artEntry)
    .map((artType) => {
      const amount = rollDiceForDefinition(artEntry[artType])
      return {
        artType: `${artTypeToFancy(artType)}, ${artType} each`,
        amount,
        amountInGP: amount * gpConversionRatio(artType)
      }
    })
}

const getMagic = (roll, magicEntries) => {
  const magicEntry = getEntry(roll, magicEntries)
  const magicItemQtys = Object.keys(magicEntry)
    .reduce((memo, magicType) => {
      let numRollsOnTable = rollDiceForDefinition(magicEntry[magicType])
      while (numRollsOnTable--) {
        memo.push(magicItemFromTable(magicType))
      }
      return memo
    }, [])
    .reduce((memo, magicType) => {
      if (!memo[magicType]) {
        memo[magicType] = 0
      }
      memo[magicType]++
      return memo
    }, {})
  return Object.keys(magicItemQtys).map(magicType => ({
    amount: magicItemQtys[magicType],
    magicType
  }))
}

const getTreasure = (type, cr) => {
  const table = getTreasureTable(type, cr)
  const roll = rollDie(100)
  const coins = getCoins(roll, table.coins)
  const gems = getGems(roll, table.gems)
  const art = getArt(roll, table.art)
  const magic = getMagic(roll, table.magic)
  return { roll, coins, gems, art, magic }
}

export { getTreasure }

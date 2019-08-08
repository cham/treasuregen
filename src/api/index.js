const getTreasureTable = (type, cr) => require(`../data/table-${type}-${cr}.json`)
const getGemTable = type => require(`../data/table-gems-${type}.json`)
const getArtTable = type => require(`../data/table-art-${type}.json`)
const getMagicTable = type => require(`../data/table-magic-${type}.json`)
const getCreatorTable = () => require('../data/table-specialfeatures-creator.json')
const getHistoryTable = () => require('../data/table-specialfeatures-history.json')
const getMinorPropertyTable = () => require('../data/table-specialfeatures-minorproperty.json')
const getQuirkTable = () => require('../data/table-specialfeatures-quirk.json')

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

const rollDiceUnique = (numFaces, numRolls) => {
  if (numRolls > numFaces) {
    throw new Error(`Cannot retrieve ${numRolls} unique rolls from a ${numFaces} sided die`)
  }
  const rolls = []
  let roll
  let shortCircuit = 100000
  while (rolls.length < numRolls && shortCircuit--) {
    roll = rollDie(numFaces)
    if (rolls.indexOf(roll) === -1) {
      rolls.push(roll)
    }
  }
  return rolls
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
  if (itemKey === 'pp') {
    return 10
  }
  if (itemKey === 'gp') {
    return 1
  }
  if (itemKey.match(/gp$/)) {
    return parseInt(itemKey.replace('gp', ''))
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
  const gemTable = getGemTable(gemType)
  const roll = rollDie(gemTable.length)
  return gemTable[roll-1]
}

const artTypeToFancy = (artType) => {
  const artTable = getArtTable(artType)
  const roll = rollDie(artTable.length)
  return artTable[roll-1]
}

const magicItemFromTable = (tableName) => {
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

const getRandomEntriesOfType = (entries, typeKey, fancyFn) => {
  return Object.keys(entries)
    .reduce((memo, valueType) => {
      let amount = rollDiceForDefinition(entries[valueType])
      while (amount--) {
        let datum = {
          amountInGP: gpConversionRatio(valueType)
        }
        datum[typeKey] = `${fancyFn(valueType)}, ${valueType} each`
        memo.push(datum)
      }
      return memo
    }, [])
    .reduce((memo, datum) => {
      let found = false
      memo.forEach((itemInMemo) => {
        if (itemInMemo[typeKey] === datum[typeKey]) {
          itemInMemo.amount++
          found = true
        }
      })
      if (!found) {
        memo.push({
          ...datum,
          amount: 1
        })
      }
      return memo
    }, [])
}

const generateDetail = () => {
  const creatorTable = getCreatorTable()
  const creators = [ creatorTable[rollDie(creatorTable.length) - 1] ]
  const historyTable = getHistoryTable()
  const histories = [ historyTable[rollDie(historyTable.length) - 1] ]
  const minorPropertyTable = getMinorPropertyTable()
  let minorProperties = [ minorPropertyTable[rollDie(minorPropertyTable.length) - 1] ]
  if (minorProperties[0] === '{{rerollx2}}') {
    console.log('got reroll')
    const minorPropertyUniqueRolls = rollDiceUnique(minorPropertyTable.length - 1, 2)
    minorProperties = [
      minorPropertyTable[minorPropertyUniqueRolls[0] - 1],
      minorPropertyTable[minorPropertyUniqueRolls[1] - 1]
    ]
    console.log(minorProperties)
  }
  const quirkTable = getQuirkTable()
  const quirks = [ quirkTable[rollDie(quirkTable.length) - 1] ]
  return { creators, histories, minorProperties, quirks }
}

const getGems = (roll, gemEntries) => {
  const gemEntry = getEntry(roll, gemEntries)
  return getRandomEntriesOfType(gemEntry, 'gemType', gemTypeToFancy)
}

const getArt = (roll, artEntries) => {
  const artEntry = getEntry(roll, artEntries)
  return getRandomEntriesOfType(artEntry, 'artType', artTypeToFancy)
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
    magicType,
    detail: generateDetail()
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

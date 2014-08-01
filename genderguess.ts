/// <reference path="./types/lodash/lodash.d.ts" />
/// <reference path="./types/node/node.d.ts" />
/// <reference path="./types/types.ts" />

import _ = require('lodash')
import females = require('./names/final_names/finalFemaleNames')
import males = require('./names/final_names/finalMaleNames')

export function guess(nameToGender:string):NameData {
    console.log('nameToGender',nameToGender)

    var femaleNames:NameData[] = females.names
    var maleNames:NameData[] = males.names

    var nullGender:NameData = {name: null, gender: null, confidence: null}

    if (!nameToGender) return nullGender

    function genderMatch(nameToGender:string, maleNames:NameData[], femaleNames:NameData[]):NameData {
        var maleMatch = lookUpMatch(nameToGender, maleNames)
        var femaleMatch = lookUpMatch(nameToGender, femaleNames)
        console.log('maleMatch',maleMatch)
        console.log('femaleMatch',femaleMatch)
        if (!maleMatch && !femaleMatch) return nullGender // If cannot find, return null dataset
        if (!maleMatch) return formatWinner(femaleMatch, null)
        if (!femaleMatch) return formatWinner(maleMatch, null)
        var winnerLoser = determineWinner(maleMatch, femaleMatch)
        return formatWinner(winnerLoser.winner, winnerLoser.loser)
    }

    function lookUpMatch(nameToGender:string, names:NameData[]):NameData {
        return _.find(names, function(name) {
            return name.name.toLowerCase() == nameToGender.toLowerCase()
        })
    }

    function determineWinner(match1:NameData, match2:NameData):WinnerLoser {
        var winnerLoser:WinnerLoser = {
            winner: (Number(match1.births) > Number(match2.births)) ? match1 : match2,
            loser: (Number(match1.births) > Number(match2.births)) ? match2 : match1,
        }
        return winnerLoser
    }

    function formatWinner(winner:NameData, loser:NameData):NameData {
        winner = _.clone(winner)
        loser = _.clone(loser)
        if (!loser) winner.confidence = 0.999 // Because it feels weird to return a confidence of 100% :)
        else winner.confidence = Math.round(Number(winner.births) / (Number(winner.births) + Number(loser.births))*10000)/10000
        delete winner.births            
        return winner
    }

    return genderMatch(nameToGender, maleNames, femaleNames)
}
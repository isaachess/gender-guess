/// <reference path="../types/lodash/lodash.d.ts" />
/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/types.ts" />

import _ = require('lodash')
import females = require('../names/final_names/finalFemaleNames')
import males = require('../names/final_names/finalMaleNames')

export function guess(nameToGender:string):NameData {

    if (!nameToGender) return nullGender

    var femaleNames:NameData[] = females.names
    var maleNames:NameData[] = males.names
    var nullGender:NameData = {name: null, gender: null, confidence: null}  
    var firstName = nameToGender.split(' ').slice(0, 1)[0];     // Get the first name only

    return genderMatch(firstName, maleNames, femaleNames)

    // Helper functions
    function genderMatch(firstName:string, maleNames:NameData[], femaleNames:NameData[]):NameData {
        var maleMatch = lookUpMatch(firstName, maleNames)
        var femaleMatch = lookUpMatch(firstName, femaleNames)
        if (!maleMatch && !femaleMatch) return nullGender       // If cannot find, return null dataset
        if (!maleMatch) return formatWinner(femaleMatch, null)
        if (!femaleMatch) return formatWinner(maleMatch, null)
        var winnerLoser = determineWinner(maleMatch, femaleMatch)
        return formatWinner(winnerLoser.winner, winnerLoser.loser)
    }

    function lookUpMatch(firstName:string, names:NameData[]):NameData {
        return _.find(names, function(name) {
            return name.name.toLowerCase() == firstName.toLowerCase()
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
        // Clone winner/loser to prevent bug when you request the same name twice in a row
        var winnerC = _.clone(winner)
        var loserC = _.clone(loser)
        if (!loserC) winnerC.confidence = 0.999     // Because it feels weird to return a confidence of 100% :)
        else winnerC.confidence = Math.round(Number(winnerC.births) / (Number(winnerC.births) + Number(loserC.births))*10000)/10000
        delete winnerC.births            
        return winnerC
    }
}
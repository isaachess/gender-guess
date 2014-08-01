/// <reference path="./types/lodash/lodash.d.ts" />
/// <reference path="./types/node/node.d.ts" />
/// <reference path="./types/types.ts" />

import _ = require('lodash')

export function guess(nameToGender:string):NameData {

    var femaleNames:NameData[] = [
        {name: 'Ashleigh', gender: 'F', births: 200},
        {name: 'Lee', gender: 'F', births: 200},
        {name: 'Mary', gender: 'F', births: 1000}
    ]

    var maleNames:NameData[] = [
        {name: 'Ashleigh', gender: 'M', births: 250},
        {name: 'Lee', gender: 'M', births: 150},
    ]

    var nullGender:NameData = {name: null, gender: null, confidence: null}

    if (!nameToGender) return nullGender

    function genderMatch(nameToGender:string, maleNames:NameData[], femaleNames:NameData[]):NameData {
        var maleMatch = lookUpMatch(nameToGender, maleNames)
        var femaleMatch = lookUpMatch(nameToGender, femaleNames)
        if (!maleMatch && !femaleMatch) return nullGender // If cannot find, return null dataset
        if (!maleMatch) return formatWinner(femaleMatch, null)
        if (!femaleMatch) return formatWinner(maleMatch, null)
        var winnerLoser = determineWinner(maleMatch, femaleMatch)
        return formatWinner(winnerLoser.winner, winnerLoser.loser)
    }

    function lookUpMatch(nameToGender:string, names:NameData[]):NameData {
        return _.find(names, function(name) {
            return name.name == nameToGender
        })
    }

    function determineWinner(match1:NameData, match2:NameData):WinnerLoser {
        var winnerLoser:WinnerLoser = {
            winner: (match1.births > match2.births) ? match1 : match2,
            loser: (match1.births > match2.births) ? match2 : match1,
        }
        return winnerLoser
    }

    function formatWinner(winner:NameData, loser:NameData):NameData {
        if (!loser) winner.confidence = 0.999 // Because it feels weird to return a confidence of 100% :)
        else winner.confidence = Math.round(winner.births / (winner.births + loser.births)*10000)/10000
        delete winner.births            
        return winner
    }

    return genderMatch(nameToGender, maleNames, femaleNames)
}
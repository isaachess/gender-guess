var _ = require('lodash')

function genderGuess(nameToGender) {

    console.log('hello!')

    var femaleNames = [
        {name: 'Ashleigh', gender: 'F', births: '200'},
        {name: 'Lee', gender: 'F', births: '200'},
    ]

    var maleNames = [
        {name: 'Ashleigh', gender: 'M', births: '250'},
        {name: 'Lee', gender: 'M', births: '150'},
    ]

    if (!name) return null

    function genderMatch(nameToGender, maleNames, femaleNames) {
        var maleMatch = lookUpMatch(nameToGender, maleNames)
        var femaleMatch = lookUpMatch(nameToGender, femaleNames)
        if (!maleMatch && !femaleMatch) return null
        if (!maleMatch) return formatMatch(femaleMatch)
        if (!femaleMatch) return formatMatch(maleMatch)
        var winnerLoser = determineWinner(maleMatch, femaleMatch)
        return formatWinner(winnerLoser.winner, winnerLoser.loser)
    }

    function lookUpMatch(nameToGender, names) {
        return _.find(names, function(name) {
            return name.name == nameToGender
        })
    }

    function determineWinner(match1, match2) {
        var winnerLoser = {
            winner: (match1.births > match2.births) ? match1 : match2,
            loser: (match1.births > match2.births) ? match2 : match1mat1,
        }
        return winnerLoser
    }

    function formatWinner(winner, loser) {
        if (!loser) winner.confidence = 0.999
        winner.confidence = winner.births / (winner.births + loser.births)
        return winner
    }

    return genderMatch(nameToGender, maleNames, femaleNames)
}

exports.genderGuess = genderGuess
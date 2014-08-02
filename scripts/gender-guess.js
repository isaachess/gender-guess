/// <reference path="../types/lodash/lodash.d.ts" />
/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/types.ts" />
var _ = require('lodash');
var females = require('../names/final_names/finalFemaleNames');
var males = require('../names/final_names/finalMaleNames');

function guess(nameToGender) {
    if (!nameToGender)
        return nullGender;

    var femaleNames = females.names;
    var maleNames = males.names;
    var nullGender = { name: null, gender: null, confidence: null };
    var firstName = nameToGender.split(' ').slice(0, 1)[0];

    return genderMatch(firstName, maleNames, femaleNames);

    // Helper functions
    function genderMatch(firstName, maleNames, femaleNames) {
        // Get male and female matches for this name
        var maleMatch = lookUpMatch(firstName, maleNames);
        var femaleMatch = lookUpMatch(firstName, femaleNames);

        // Handle null/undefined
        if (!maleMatch && !femaleMatch)
            return nullGender;
        if (!maleMatch)
            return formatWinner(femaleMatch, null);
        if (!femaleMatch)
            return formatWinner(maleMatch, null);

        // Determine the WINNER WINNER WINNER!
        var winnerLoser = determineWinner(maleMatch, femaleMatch);

        // Return formatted result
        return formatWinner(winnerLoser.winner, winnerLoser.loser);
    }

    function lookUpMatch(firstName, names) {
        return _.find(names, function (name) {
            return name.name.toLowerCase() == firstName.toLowerCase();
        });
    }

    function determineWinner(match1, match2) {
        // Winner is simply determined by which gender has more births for that name
        var winnerLoser = {
            winner: (Number(match1.births) > Number(match2.births)) ? match1 : match2,
            loser: (Number(match1.births) > Number(match2.births)) ? match2 : match1
        };
        return winnerLoser;
    }

    function formatWinner(winner, loser) {
        // Clone winner/loser to prevent bug when you request the same name twice in a row
        var winnerC = _.clone(winner);
        var loserC = _.clone(loser);
        if (!loserC)
            winnerC.confidence = 0.999;
        else
            winnerC.confidence = Math.round(Number(winnerC.births) / (Number(winnerC.births) + Number(loserC.births)) * 10000) / 10000;
        delete winnerC.births;
        return winnerC;
    }
}
exports.guess = guess;

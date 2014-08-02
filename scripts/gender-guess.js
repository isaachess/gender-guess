/// <reference path="../types/lodash/lodash.d.ts" />
/// <reference path="../types/node/node.d.ts" />
/// <reference path="../types/types.ts" />
var _ = require('lodash');
var females = require('../names/final_names/finalFemaleNames');
var males = require('../names/final_names/finalMaleNames');

function guess(nameToGender) {
    var femaleNames = females.names;
    var maleNames = males.names;

    var nullGender = { name: null, gender: null, confidence: null };

    if (!nameToGender)
        return nullGender;

    return genderMatch(nameToGender, maleNames, femaleNames);

    // Helper functions
    function genderMatch(nameToGender, maleNames, femaleNames) {
        var maleMatch = lookUpMatch(nameToGender, maleNames);
        var femaleMatch = lookUpMatch(nameToGender, femaleNames);
        if (!maleMatch && !femaleMatch)
            return nullGender;
        if (!maleMatch)
            return formatWinner(femaleMatch, null);
        if (!femaleMatch)
            return formatWinner(maleMatch, null);
        var winnerLoser = determineWinner(maleMatch, femaleMatch);
        return formatWinner(winnerLoser.winner, winnerLoser.loser);
    }

    function lookUpMatch(nameToGender, names) {
        return _.find(names, function (name) {
            return name.name.toLowerCase() == nameToGender.toLowerCase();
        });
    }

    function determineWinner(match1, match2) {
        var winnerLoser = {
            winner: (Number(match1.births) > Number(match2.births)) ? match1 : match2,
            loser: (Number(match1.births) > Number(match2.births)) ? match2 : match1
        };
        return winnerLoser;
    }

    function formatWinner(winner, loser) {
        winner = _.clone(winner);
        loser = _.clone(loser);
        if (!loser)
            winner.confidence = 0.999;
        else
            winner.confidence = Math.round(Number(winner.births) / (Number(winner.births) + Number(loser.births)) * 10000) / 10000;
        delete winner.births;
        return winner;
    }
}
exports.guess = guess;

# Gender-Guess

Determine a person's gender based on a name. To determine if it is more likely male or female, it compares the name against the top 10,000 male and 10,000 female names from all US births 1930 - 2013. Data from the social security administration, so it works best for US names.

# Installation

    npm install gender-guess

# Usage

    var gender = require('gender-guess')

    gender.guess(name, options)

# Examples

    gender.guess('Thor')

    =>
    {
        name: 'Thor',
        gender: 'M',
        confidence: 0.9999
    }
    // Sorry Marvel, looks like Thor is still male.


    gender.guess('Natasha')

    =>
    {
        name: 'Natasha',
        gender: 'F',
        confidence: 0.997
    }

You can also include full names. It will take only the first part of the name (until the first space) to guess gender.

    gender.guess('John Jacob Jingleheimer Schmidt')

    =>
    {
        name: 'John',
        gender: 'M',
        confidence: 0.9962
    }

If it cannot find a name it will return all values as null.

    gender.guess('Bilbo Baggins')

    =>
    {
        name: null,
        gender: null,
        confidence: null
    }

**Pro tip**: some names are more ambiguous than others. Consider setting a limit in your code to only accept gender guesses that reach a certain confidence level. (In the future we'll add that as a native option.)
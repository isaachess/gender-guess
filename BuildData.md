# Process to build the name data

NOTE: This step is *not* necessary to use the module. It's only necessary if you want to make a custom build of the names used in the dataset. Out-of-the-box, it checks names against all births from 1930 - 2013.

The name data comes from the social security administration. It is in raw CSV files, a separate file for each year. The files are large -- combined they are well over 1.5 million lines. The process below outlines how to aggregate these into the data we want.

## 1. Concat the files you want

You will find *all* the files in the `names/` directory, split into two folders: `years_unused/` and `years_used/`. (We don't really care about the stats if those people are no longer alive. The data goes back to 1880.)

To concat the files, follow this process:

* Sort the years you *want* to include into the `years_used/` directory. Put all other files in the `years_unused/` directory.
* Run `gulp concat-names` to generate a file `names/years_used/combined.csv` which will include ALL the names we are using in a single file.

## 2. Boot up R to work with the huge dataset

We now have a humongous csv file, so we'll use a special tool for this: R. (If you're unfamiliar with R, [see here](http://www.r-project.org). Basically it's an awesome free statistical tool.)

Here's the process:

* Open R (duh)
* Load our script for R located at `names/R/aggregateNames.R`
* Run it
    * NOTE: You will have to update the file paths yourself, but it should be pretty self-explanatory.
    * If you're new to R, you can copy/paste each line into the terminal one by one, or you can figure out how to run the entire file at once.
* When finished it will save two files: `names/final_names/finalFemaleNames.csv` and `names/final_names/finalMaleNames.csv`

The R script does a few things:

1. Splits the file into male names and female names
2. Aggregates the total births for each name. (E.g., it sums up all the 'Mary's from each year, giving a total number of 'Mary' births for the time period you included)
3. Sorts the names in descending
4. Grabs the top 10,000.

In practical terms, this gives you the top 10,000 names (by total births) for each gender, in the time period you included in step 1.

Sorry that this process is manual. In the future I'll add a gulp task that runs the whole thing on command-line. But for now ... we live with it.

## 3. Convert the CSV files to JSON

This one is easy. Run `gulp toJsonFemale` and `gulp toJsonMale`.

This will create **TypeScript** files for each csv file from step 2, with the same names and in the same directories.

## 4. Manually edit Typescript files.

Open each TypeScript file and enter the following code at the beginning of the file:

`export var names = ...`

So it should look like:

`export var names = [{"births":"2547807","name":"Mary","gender":"F"}, ...`

## 5. Compile TypeScript

Run `gulp build` to compile the TypeScript files. If you did everything correctly, it should finish with no errors or warnings.

That's it! You now have a custom build of the names dataset, containing only the years you're interested in using.
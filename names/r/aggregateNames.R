names <- read.csv(file="Documents/programming/gender-guess/names/years_used/combined.csv", head=TRUE, sep=",")
splitNames <- split(names, names$gender)
aggMaleNames <- aggregate(births ~ name + gender, data=splitNames$M, FUN=sum, na.rm=TRUE)
aggFemaleNames <- aggregate(births ~ name + gender, data=splitNames$F, FUN=sum, na.rm=TRUE)

aggMaleNames <- aggMaleNames[order(-aggMaleNames$births),]
aggFemaleNames <- aggFemaleNames[order(-aggFemaleNames$births),]

topMaleNames <- head(aggMaleNames, 10000)
topFemaleNames <- head(aggFemaleNames, 10000)

write.csv(topMaleNames, file="Documents/programming/gender-guess/names/final_names/finalMaleNames.csv", quote=FALSE, row.names=FALSE)
write.csv(topFemaleNames, file="Documents/programming/gender-guess/names/final_names/finalFemaleNames.csv", quote=FALSE, row.names=FALSE)

// Get the locale
var locale = GetEnvironment().locale;
if (locale == "es") {
  var indicatorHeading = "Días de colección";
  var harvestFestivalText = "días restantes";
} else {
  var indicatorHeading = "Collection days";
  var harvestFestivalText = "days to go!";
}

// Important dates :-)
var today = Now();
var harvestFestival = Date(2025, 7, 21, 8, 0, 0, 0, "America/Chicago");
var untilHarvest = Ceil(DateDiff(harvestFestival, today, "days") - 1);

return {
  topText: `${indicatorHeading}`,
  topTextMaxSize: "medium",
  middleText: $datapoint.COUNT_ROW__ID,
  middleTextMaxSize: "large",
  bottomText: `${untilHarvest} ${harvestFestivalText} 🌽`,
};
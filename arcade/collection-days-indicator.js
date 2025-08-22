// Get the locale
var locale = GetEnvironment().locale;
if (locale == "es") {
  var indicatorHeading = "Días de colección";
  var daysRemainText = "días restantes";
} else {
  var indicatorHeading = "Collection days";
  var daysRemainText = "days to go!";
}

// Important collection dates
var todaysDate = Now();
var importantDate = Date("2026-03-10");
var daysTilImportantDate = Ceil(DateDiff(importantDate, todaysDate, "days"));

return {
  topText: `${indicatorHeading}`,
  topTextMaxSize: "medium",
  middleText: $datapoint.COUNT_ROW__ID,
  middleTextMaxSize: "large",
  bottomText: `${daysTilImportantDate} ${daysRemainText} 🐿️`,
}

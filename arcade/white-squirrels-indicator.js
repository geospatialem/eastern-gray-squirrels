// Get the locale
var locale = GetEnvironment().locale;

// Set the title based on the locale
if (locale == "es") {
  var squirrelText = "Ardilla de blanco";
} else {
  var squirrelText = "White squirrels";
}

return {
  topText: `${squirrelText}`,
  topTextMaxSize: "medium",
  middleText: $datapoint.COUNT_OBJECTID,
  middleTextMaxSize: "large",
};
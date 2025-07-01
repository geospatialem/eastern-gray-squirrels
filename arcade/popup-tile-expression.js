// Get the locale
// Resource: https://developers.arcgis.com/arcade/function-reference/debugging_functions/#getenvironment
var locale = GetEnvironment().locale;

// Set the popup title based on the locale
if (locale == "es") {
  return IIF(
    $feature.Morph_type == "Black",
    "Avistamiento de ardilla de morfo negro",
    "Avistamiento de ardilla de morfo blanco"
  );
} else {
  return `${$feature.Morph_type} morph squirrel sighting`;
}
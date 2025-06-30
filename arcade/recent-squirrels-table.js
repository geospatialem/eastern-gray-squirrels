// Get the locale
var locale = GetEnvironment().locale;

if (locale == "es") {
  var squirrelMorphColor = IIF(
    $datapoint.Morph_type == "Black",
    "Negro",
    "Blanco"
  );
  var observationText = IIF(
    $datapoint.Observation_Type == "Walk",
    "Caminata",
    "Ventana"
  );
  var dateValue = Text($datapoint.Date_Time, "D/M/YYYY,");
  var timeValue = Text($datapoint.Date_Time, "HH:mm");
} else {
  var squirrelMorphColor = $datapoint.Morph_type;
  var observationText = $datapoint.Observation_Type;
  var dateValue = Text($datapoint.Date_Time, "MMM DD, YYYY, ");
  var timeValue = Text($datapoint.Date_Time, " h:mm A");
}

// Colors for squirrels text
var squirrelBackgroundColor = $datapoint.Morph_type;
var squirrelTextColor = IIF(squirrelBackgroundColor == "Black", "#fff", "#000");

return {
  cells: {
    Morph_type: {
      displayText: `${squirrelMorphColor}`,
      textColor: `${squirrelTextColor}`,
      backgroundColor: `${squirrelBackgroundColor}`,
      textAlign: "left",
    },

    Observation_Type: {
      displayText: `${observationText}`,
      textAlign: "left",
    },

    Date_Time: {
      displayText: Text(`${dateValue} ${timeValue}`),
      textAlign: "left",
    },
  },
};
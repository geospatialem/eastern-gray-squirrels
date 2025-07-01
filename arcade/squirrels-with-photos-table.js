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
  var notesText = $datapoint.Notes_es;
} else {
  var squirrelMorphColor = $datapoint.Morph_type;
  var observationText = $datapoint.Observation_Type;
  var notesText = $datapoint.Notes;
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
      textAlign: "center",
    },

    Notes: {
      displayText: `<div style='text-wrap: wrap;'>${notesText}</div>`,
      textAlign: "left",
    },

    Observation_Type: {
      displayText: `${observationText}`,
      textAlign: "center",
    },
  },
};
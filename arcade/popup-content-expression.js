// Dynamically generate squirrel color
var squirrelColor = IIF($feature.Morph_type == "Black", "white", "black");
var backgroundColor = IIF(squirrelColor == "black", "#CCC", "black");

// Get the locale
var locale = GetEnvironment().locale;

// Resources:
// https://developers.arcgis.com/arcade/guide/logic/#iif
// https://developers.arcgis.com/arcade/function-reference/text_functions
if (locale == "es") {
  var morphHeading = "Tipo de morfo";
  var morphColor = IIF($feature.Morph_type == "Black", "Negro", "Blanco");
  var dateHeading = "Fecha de observación";
  var dateValue = Text($feature.Date_Time, "D/M/YYYY,");
  var timeValue = Text($feature.Date_Time, "HH:mm");
  var observationHeading = "Tipo de observación";
  var observationType = IIF(
    $feature.Observation_Type == "Walk",
    "Caminata",
    "Ventana"
  );
  var notesHeading = "Notas";
  var notesValue = $feature.Notes_es;
  var photoHeading = "Foto";
} else {
  var morphHeading = "Morph type";
  var morphColor = $feature.Morph_type;
  var dateHeading = "Observation date";
  var dateValue = Text($feature.Date_Time, "MMM DD, YYYY, ");
  var timeValue = Text($feature.Date_Time, " h:mm A");
  var observationHeading = "Observation type";
  var observationType = $feature.Observation_Type;
  var notesHeading = "Notes";
  var notesValue = $feature.Notes;
  var photoHeading = "Photo";
}

// Display notes only when provided and without a photo
// Resource: https://developers.arcgis.com/arcade/guide/logic/#isempty
if (HasValue($feature, "Notes") && IsEmpty($feature.Photo_URL)) {
  var squirrelNotes = `<tr><th>${notesHeading}</th><td>${notesValue}</td></tr>`;
} else {
  squirrelNotes = "";
}

// Display a photo and include the note as the alt tag
if (HasValue($feature, "Photo_URL")) {
  var squirrelPhoto = `<tr><th>${photoHeading}</th><td><img src="${$feature.Photo_URL}" alt= "${notesValue}" title="${notesValue}" /></td></tr>`;
} else {
  var squirrelPhoto = "";
}

// Return the content in a table format for better a11y and i18n support
return {
  type: "text",
  text: `<table style="text-align:left">
	        <tr>
					  <th>${morphHeading}</th>
					  <td><span style="background-color:${backgroundColor};color:${squirrelColor}"><b>${morphColor}</b></span></td> 
					</tr>
					<tr>
					 <th>${dateHeading}</th>
					 <td>${dateValue} ${timeValue}</td>
					</tr>
					<tr>
					  <th>${observationHeading}</th>
						<td>${observationType}</td>
					</tr>
					${squirrelNotes}
					${squirrelPhoto}
				</table>`,
};
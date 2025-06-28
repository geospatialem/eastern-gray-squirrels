# [Dashboard](https://www.arcgis.com/apps/dashboards/21159e6135bc40158c4314782fc20f5c)

- [Black squirrels indicator](#black-squirrels-indicator)
- [White squirrels indicator](#white-squirrels-indicator)
- [Collection days indicator](#collection-days-indicator)
- [Recent squirrels table](#recent-squirrels-table)
- [Squirrels with photos table](#squirrels-with-photos-table)
- [Collection days and observations serial chart](#collection-days-and-observations-serial-chart)

## Black squirrels indicator

```js
// Get the locale (Resource: https://developers.arcgis.com/arcade/function-reference/debugging_functions/#getenvironment)
var locale = GetEnvironment().locale;

// Set the title based on the locale
if (locale == "es") {
  var squirrelText = "Ardilla de negro";
} else {
  var squirrelText = "Black squirrels";
}

return {
  topText: `${squirrelText}`,
  topTextMaxSize: "medium",
  middleText: $datapoint.COUNT_OBJECTID,
  middleTextMaxSize: "large",
};
```

## White squirrels indicator

```js
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
```

## Collection days indicator

### Data expression

```js
var fs = FeatureSetByPortalItem(
  Portal("https://www.arcgis.com/"),
  "e714bfeed51f447b8a36051dd62c0666",
  0,
  ["*"],
  false
);

// Group by year, month, and day to ignore time
var grouped = GroupBy(
  fs,
  [
    { name: "Year", expression: "EXTRACT(YEAR FROM Date_Time)" },
    { name: "Month", expression: "EXTRACT(MONTH FROM Date_Time)" },
    { name: "Day", expression: "EXTRACT(DAY FROM Date_Time)" },
  ],
  []
);

// The count of unique dates is the number of groups
return grouped;
```

### Indicator

```js
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
```

## Recent squirrels table

```js
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
```

## Squirrels with photos table

```js
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
```

## Collection days and observations serial chart

### Data expression

```js
// Get the FeatureSet from your data source
var fs = FeatureSetByPortalItem(
  Portal("https://www.arcgis.com"),
  "e714bfeed51f447b8a36051dd62c0666",
  0,
  ["Date_Time"],
  false
);

// Dictionary to store unique days per month-year
var monthDayDict = {};
// Dictionary to store counts per month-year
var monthCounts = {};

// Loop through features to build unique day keys per month
for (var f in fs) {
  var dt = f["Date_Time"];
  if (!IsEmpty(dt)) {
    var yr = Year(dt);
    var mo = Month(dt) + 1; // Month() is 0-based in Arcade, so add 1
    var dy = Day(dt);
    var monthKey = Text(yr) + "-" + Text(mo, "00");
    var dayKey = Text(yr) + "-" + Text(mo, "00") + "-" + Text(dy, "00");
    if (!HasKey(monthDayDict, monthKey)) {
      monthDayDict[monthKey] = [];
    }
    // Add unique dayKey if not already present
    if (IndexOf(monthDayDict[monthKey], dayKey) == -1) {
      Push(monthDayDict[monthKey], dayKey);
    }
  }
}

// Loop through features to build month-year keys and count
for (var f in fs) {
  var dt = f["Date_Time"];
  if (!IsEmpty(dt)) {
    // Get year and month as numbers
    var yr = Year(dt);
    var mo = Month(dt) + 1; // Month() returns 0-11, so add 1
    var key = Text(yr) + "-" + Text(mo, "00");
    if (HasKey(monthCounts, key)) {
      monthCounts[key] += 1;
    } else {
      monthCounts[key] = 1;
    }
  }
}

// Prepare output as a FeatureSet
var outDict = {
  fields: [
    { name: "MonthYear", type: "esriFieldTypeString" },
    { name: "OM_Count", type: "esriFieldTypeInteger" },
    { name: "CDM_UniqueDayCount", type: "esriFieldTypeInteger" },
  ],
  geometryType: "",
  features: [],
};

// Push collection per day by month
for (var k in monthDayDict) {
  var om_count = null;
  if (HasKey(monthCounts, k)) {
    om_count = monthCounts[k];
  }
  Push(outDict.features, {
    attributes: {
      MonthYear: k,
      CDM_UniqueDayCount: Count(monthDayDict[k]),
      OM_Count: monthCounts[k],
    },
  });
}

return FeatureSet(Text(outDict));
```

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
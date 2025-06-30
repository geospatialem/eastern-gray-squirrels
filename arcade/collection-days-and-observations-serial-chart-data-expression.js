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
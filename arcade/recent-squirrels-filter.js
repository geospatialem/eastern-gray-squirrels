// Get squirrel data
var fs = FeatureSetByPortalItem(
    Portal('https://www.arcgis.com/'),
    'e714bfeed51f447b8a36051dd62c0666',
    0,
    ["*"],
    true
);

// Today's date
var dateToday = DateOnly(Today())

// Create empty arrays for filtered features
var featuresToday = []
var featuresLastSevenDays = []
var newFeatures = []

// Define the schema for the new FeatureSet
var fields = Schema(First(fs)).fields
var newFields = []
for (var field of fields) {    
    Push(newFields, { name: field.name, type: field.type})
}

// Loop through each feature in the input FeatureSet
// to get rows with today's date and last 7 days
for (var f in fs) {
    // Check if the feature's date is today
    if (DateDiff(dateToday, DateOnly(f.Date_Time), 'days') == 0) {
        Push(featuresToday, f)
    } else if (DateDiff(dateToday, DateOnly(f.Date_Time), 'days') <= 7) {
        // Check if the feature's date falls in the last 7 days        
        Push(featuresLastSevenDays, f)        
    }
}

// Determine which arrays to iterate
var featuresToShow = IIF(Count(featuresToday) > 0, featuresToday, featuresLastSevenDays)
for (var feat of featuresToShow) {
    Push(newFeatures, feat)
}

// Build json
var jsonDict = {
    fields: newFields,
    spatialReference: { wkid: 102100 },
    geometryType: "esriGeometryPoint",
    features: newFeatures
}

// Return the new FeatureSet
return FeatureSet(Text(jsonDict))
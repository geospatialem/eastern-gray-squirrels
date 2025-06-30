if (DateDiff($feature.Date_Time, Today(), "days") <= 0) {
  return "notTodaysRecord";
} else {
  return "todaysRecord";
}
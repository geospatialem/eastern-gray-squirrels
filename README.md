# Eastern Gray Squirrels 🐿️

**A repository for data and analysis on the Eastern gray squirrel.**

## Overview

This repository collects and analyzes data on the **Eastern gray squirrel**. The project uses the ArcGIS technology stack to explore patterns in squirrel distribution and color morph variation.

### Recordings and slides

- "**ArcGIS Apps: Enhancing Accessibility and Localization**" presented at the 2026 Esri Developer & Technology Summit on Thursday, March 12 in Palm Springs, California
  - <a href="arcgis-apps-enhancing-accessibility-and-localization.pdf" target="_blank" rel="noopener noreferrer">Slides</a>, opens in a new window
  - <a href="https://registration.esri.com/flow/esri/26epcdev/deveventportal/page/detailed-agenda/session/1761120762447001nrNf" target="_blank" rel="noopener noreferrer">Recording</a>, opens in a new window
- 🔜 "**ArcGIS: Automating and Enhancing Apps for Accessibility and Localization**" to be presented at the 2026 Esri User Conference on Tuesday, July 14 in San Diego, California
  - <a href="https://registration.esri.com/flow/esri/26uc/eventportal/page/detailed-agenda/session/1763065877459001w3Vj" target="_blank" rel="noopener noreferrer">Session details</a>, opens in a new window
  - _Slides, coming soon_

## Features

- **Data preprocessing** scripts for squirrel observation
- **Exploratory data analysis** including:
  - Distribution of sightings
  - Analysis of fur color variation
- **Visualization** to explore squirrel data
- **Automation** to ease data collection and provide on-demand content to more audiences

## Tech stack

- **[ArcGIS Survey123](https://jsapi.maps.arcgis.com/home/item.html?id=839d3eb3116347cc9c4a7ed9f8fb37c4)** for mobile collection
- **ArcGIS Online Map Viewer ([English](https://jsapi.maps.arcgis.com/apps/mapviewer/index.html?webmap=628500cb6c834ed98d8b9fc0c4c06e07) || [Spanish](https://jsapi.maps.arcgis.com/apps/mapviewer/index.html?webmap=628500cb6c834ed98d8b9fc0c4c06e07&locale=es))** for data authoring
- **ArcGIS Dashboards ([English](https://www.arcgis.com/apps/dashboards/21159e6135bc40158c4314782fc20f5c) || [Spanish](https://www.arcgis.com/apps/dashboards/21159e6135bc40158c4314782fc20f5c#locale=es))** for data visualization
- **[ArcGIS Notebooks](https://jsapi.maps.arcgis.com/home/item.html?id=3f84d0a14ae843beb83dfbdff2897e7f)** for automated data processing
- **[ArcGIS Hosted Feature Layer Webhook](https://doc.arcgis.com/en/arcgis-online/reference/webhooks-online.htm)** for allowing a web application or service to send near real-time information to another web service
- **[Microsoft Power Automate ArcGIS Connectors](https://doc.arcgis.com/en/power-automate/latest/get-started/get-started-with-arcgis-connectors-for-power-automate.htm)** for integrating ArcGIS processes with automation

## Repository Structure

```
.
├── arcade/        # Expressions to drive popups in Map Viewer and Dashboard widgets
├── python/        # Python scripts and ArcGIS Notebooks to automate processes
└── README.md      # Project documentation
```

## Example Analysis

- Number of collection days
- Latest squirrel observations
- Squirrel observations with pictures
- Black vs White squirrels sightings
- Number of days to Harvest Fest

## Contributing

Contributions are welcome! Please [open an issue](https://github.com/geospatialem/eastern-gray-squirrels/issues/new) or submit a pull request for bug fixes, data additions, or new analysis features.

## License

This project is licensed under the Apache-2.0 License.

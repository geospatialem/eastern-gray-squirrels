# Python automation
This directory contains ready-to-use ArcGIS Notebooks (.ipynb).

## [Squirrel Automation via Notebooks](./squirrel-automation.ipynb)

### How it works

#### Updates the Photo URL Field

This step automates the process of populating the `Photo_URL` field in your feature layer. The script retrieves all photo attachments for each feature, constructs direct URLs to these attachments, and updates the corresponding field in the layer so that each feature references its photo.

#### Translates English Notes to Spanish

This automation searches for features that have English notes but lack Spanish translations. It uses the Google Translate API to translate the contents of the `Notes` field from English to Spanish and updates the `Notes_es` field in your feature layer accordingly.

### Feature Layer Schema

The Python Notebook is tied to the [Squirrel Morphy Sightings](https://arcgis-devlabs.maps.arcgis.com/home/item.html?id=e714bfeed51f447b8a36051dd62c0666) feature service. You can review the feature layer schema [here](https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Squirrel_morph_sightings/FeatureServer/0).
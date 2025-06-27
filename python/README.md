# Python

## [Squirrel Automation via Notebooks](https://jsapi.maps.arcgis.com/home/notebook/notebook.html?id=3f84d0a14ae843beb83dfbdff2897e7f)

### 1. Run this cell to connect to your GIS and get started:

```py
from arcgis.gis import GIS

gis = GIS("home")
```

### 2. Update the Photo URL field

```py
from arcgis.features import FeatureLayer

item_id = "e714bfeed51f447b8a36051dd62c0666"  # The item ID of your feature layer
layer_index = 0           # Index of the layer in the item which is usually 0 for single-layer services
field_to_update = "Photo_URL"  # The field you want to populate

# Get the feature layer
item = gis.content.get(item_id)
feature_layer = item.layers[layer_index]  # Get the specific layer[1]

# Get attachments as a data frame
attachments_df = feature_layer.attachments.search(as_df=True)  # Returns all attachments

# Base url for attachments
layer_url = feature_layer.url

# Loop through the attachments data frame, extract the value, and update the field
features_to_update = []
for idx, row in attachments_df.iterrows():
    oid = row['PARENTOBJECTID']
    attachment_id = row['ID']
    # Construct the URL to the attachment
    attachment_url = f"{layer_url}/{oid}/attachments/{attachment_id}"
    # Construct update dictionary for this feature
    features_to_update.append({
        "attributes": {
            "OBJECTID": oid,
            field_to_update: attachment_url
        }
    })

# Apply updates
if features_to_update:
    result = feature_layer.edit_features(updates=features_to_update)
    print(f"Updated {field_to_update} features.")
else:
    print(f"No updates for {field_to_update}.")
```

### 3. Translate EN notes to ES

```py
from json import loads
from requests import get

notes_field = "Notes" # Notes in English
notes_es_field = "Notes_es" # Notes in Spanish
source_lang = "en"
target_lang = "es"
translation_url = f"https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl={source_lang}&tl={target_lang}&q="

# Search for features that have notes in english
where_clause = f"{notes_field} IS NOT NULL AND {notes_es_field} IS NULL"
features = feature_layer.query(where=where_clause, out_fields=f"OBJECTID,{notes_field},{notes_es_field}").features

# Apply translation
features_to_update = []
for feature in features:
    notes_value = feature.attributes.get(notes_field, "")
    if notes_value:
        request_result = get(translation_url + notes_value)
        notes_es_value = loads(request_result.text)[0][0][0]
        features_to_update.append({
            "attributes": {
                "OBJECTID": feature.attributes["OBJECTID"],
                notes_es_field: notes_es_value
            }
        })

# Apply translation to the feature layer
if features_to_update:
    result = feature_layer.edit_features(updates=features_to_update)
    print(f"Translated {len(features_to_update)} features.")
else:
    print("No features to translate.")
```

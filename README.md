# Component Generator

A simple web-based tool to generate CycloneDX JSON files for software components. This tool allows users to input details about a component and export a Software Bill of Materials (SBOM) in JSON format.

## Features

- Generate CycloneDX JSON files for components.
- Option to mark components as internal or external.
- Provides a preview of the generated JSON.
- Copy JSON to clipboard or download it as a file.
- Validation for `purl` and `cpe` fields:
  - **Purl**: Must follow the format `pkg:vendor/component@version`.
  - **CPE**: Must follow the official CPE specification regex:
    ```
    cpe:2\.3:[aho\*\-](:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\*\-]))(:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){4}
    ```

## Usage

1. Open the [Component Generator](https://niklas-lu.github.io/component-generator/).
2. Fill in the form fields:
   - **Name**: The name of the component (minimum 3 characters).
   - **Version**: The version of the component.
   - **Type**: Select the type of the component (e.g., Application, Library).
   - **License**: Select the license type.
   - **Internal**: Check this box if the component is internal. If unchecked, additional fields for `vendor`, `purl`, `cpe`, and `reference` will appear.
3. Click:
   - **Show JSON**: To preview the generated JSON.
   - **Copy JSON**: To copy the JSON to the clipboard.
   - **Download JSON**: To download the JSON file.

## Example JSON Output

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.6",
  "version": 1,
  "metadata": {
    "timestamp": "2023-10-05T12:34:56.789Z",
    "component": {
      "type": "Application",
      "name": "example-component",
      "bom-ref": "urn:uuid:example-component:1.0:123e4567-e89b-12d3-a456-426614174000",
      "group": "ExampleVendor",
      "version": "1.0",
      "description": "Description of the component",
      "purl": "pkg:examplevendor/example-component@1.0",
      "cpe": "cpe:2.3:a:examplevendor:example-component:1.0",
      "externalReferences": [
        {
          "url": "https://example.com",
          "type": "website"
        }
      ],
      "licenses": [
        {
          "license": {
            "id": "MIT"
          }
        }
      ]
    }
  }
}
```

## Live Demo

Try the tool here: [https://niklas-lu.github.io/component-generator/](https://niklas-lu.github.io/component-generator/)

## Documentation

For more information about the CycloneDX JSON format, visit the [CycloneDX JSON Documentation](https://cyclonedx.org/docs/1.6/json).

## License

This project is licensed under the [Unlicense](https://unlicense.org/).

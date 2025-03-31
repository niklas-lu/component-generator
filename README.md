# Component Generator

A simple web-based tool to generate CycloneDX JSON files for software components. This tool allows users to input details about a component and export a Software Bill of Materials (SBOM) in JSON format.

## Features

- Generate CycloneDX JSON files for components.
- Supports various component types and licenses.
- Option to mark components as internal or external.
- Provides a preview of the generated JSON.
- Copy JSON to clipboard or download it as a file.

## Usage

1. Open the [Component Generator](https://niklas-lu.github.io/component-generator/).
2. Fill in the form with the required details:
   - **Name**: Name of the component (minimum 3 characters).
   - **Version**: Version of the component.
   - **Description**: Optional description of the component.
   - **Internal**: Check if the component is internal (disables vendor input).
   - **Vendor**: Vendor name (enabled if the component is external).
   - **Type**: Select the type of the component.
   - **License**: Choose a license for the component.
   - **External Reference**: Provide a link to the component's website or origin.
3. Click **Show JSON** to preview the generated JSON.
4. Use **Copy JSON** to copy the JSON to your clipboard.
5. Click **Download JSON** to save the JSON file to your device.

## Live Demo

Try the tool here: [https://niklas-lu.github.io/component-generator/](https://niklas-lu.github.io/component-generator/)

## Documentation

For more information about the CycloneDX JSON format, visit the [CycloneDX JSON Documentation](https://cyclonedx.org/docs/1.6/json).

## License

This project is licensed under the [Unlicense](https://unlicense.org/).

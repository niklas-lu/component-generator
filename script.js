function toggleVendor() {
  if (document.getElementById("internal").checked) {
    document.getElementById("vendor").style.display = "none";
    document.getElementById("vendorLabel").style.display = "none";
    document.getElementById("purl").style.display = "none";
    document.getElementById("purlLabel").style.display = "none";
    document.getElementById("cpe").style.display = "none";
    document.getElementById("cpeLabel").style.display = "none";
    document.getElementById("reference").style.display = "none";
    document.getElementById("referenceLabel").style.display = "none";
    document.getElementById("licenseText").style.display = "none";
    document.getElementById("licenseTextLabel").style.display = "none";
  } else {
    document.getElementById("vendor").style.display = "block";
    document.getElementById("vendorLabel").style.display = "block";
    document.getElementById("purl").style.display = "block";
    document.getElementById("purlLabel").style.display = "block";
    document.getElementById("cpe").style.display = "block";
    document.getElementById("cpeLabel").style.display = "block";
    document.getElementById("reference").style.display = "block";
    document.getElementById("referenceLabel").style.display = "block";
    document.getElementById("licenseText").style.display = "block";
    document.getElementById("licenseTextLabel").style.display = "block";
  }
}

function validateInputs() {
  const name = document.getElementById("name").value.trim();
  const version = document.getElementById("version").value.trim();
  const vendor = document.getElementById("vendor").value.trim();
  const purl = document.getElementById("purl").value.trim();
  const cpe = document.getElementById("cpe").value.trim();
  const internal = document.getElementById("internal").checked;

  // Validate required fields
  if (!name || !version || (!internal && !vendor)) {
    alert("Please fill in all required fields.");
    return false;
  }

  // Validate minimum length
  if (name.length < 3 || (!internal && vendor.length < 3)) {
    alert("Name and Vendor must be at least 3 characters long.");
    return false;
  }

  // Validate PURL format if provided
  if (
    purl &&
    !internal &&
    !/^pkg:[a-z0-9]+\/[a-z0-9\-_.]+@[a-z0-9\-_.]+$/i.test(purl)
  ) {
    alert("Invalid Purl format. Expected format: pkg:vendor/component@version");
    return false;
  }

  // Validate CPE format if provided
  if (
    cpe &&
    !/^cpe:2\.3:[aho\*\-](:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\*\-]))(:(((\?*|\*?)([a-zA-Z0-9\-\._]|(\\[\\\*\?!"#$$%&'\(\)\+,/:;<=>@\[\]\^`\{\|}~]))+(\?*|\*?))|[\*\-])){4}$/i.test(
      cpe
    )
  ) {
    alert("Invalid CPE format. Please follow the official CPE specification.");
    return false;
  }

  return true;
}

function getComponentTemplate() {
  if (!validateInputs()) {
    return null;
  }

  let name = document.getElementById("name").value.trim().replace(/\s+/g, "-");
  let version = document
    .getElementById("version")
    .value.trim()
    .replace(/\s+/g, "-");
  const vendorInput = document.getElementById("vendor");
  const purlInput = document.getElementById("purl");
  const cpeInput = document.getElementById("cpe");
  const type = document.getElementById("type").value;
  const license = document.getElementById("license").value;
  const licenseText = document.getElementById("licenseText").value;
  const referenceInput = document.getElementById("reference");
  const internal = document.getElementById("internal").checked;

  const vendor = internal ? "Balluff" : vendorInput.value;
  const cpe = internal ? "" : cpeInput.value;
  const purl = internal
    ? `pkg:${vendor.toLowerCase()}/${name.toLowerCase()}@${version.toLowerCase()}`
    : purlInput.value;
  const reference = internal ? "" : referenceInput.value;

  return {
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    version: 1,
    metadata: {
      timestamp: new Date().toISOString(),
      component: {
        type: type,
        name: name,
        "bom-ref":
          "urn:uuid:" +
          name.toLowerCase() +
          ":" +
          version.toLowerCase() +
          ":" +
          crypto.randomUUID(),
        group: vendor,
        version: version,
        description: "Description of the component",
        purl: purl,
        cpe: cpe,
        externalReferences: [
          {
            url: reference,
            type: "website",
          },
        ],
        licenses: [
          {
            license: {
              id: license,
              text: licenseText,
            },
          },
        ],
      },
    },
  };
}

function generateJSON() {
  const name = document.getElementById("name").value;

  const component_template = getComponentTemplate();
  if (!component_template) {
    return;
  }

  const jsonString = JSON.stringify(component_template, null, 4);
  const blob = new Blob([jsonString], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = name.toLowerCase() + "_sbom.json";
  link.click();
}

function showTemplate() {
  const name = document.getElementById("name").value;

  const component_template = getComponentTemplate();
  if (!component_template) {
    return;
  }

  const jsonOutput = document.getElementById("jsonOutput");
  jsonOutput.textContent = JSON.stringify(component_template, null, 4);
  jsonOutput.style.display = "block";
  jsonOutput.style.textAlign = "left";
  jsonOutput.style.width = "auto";
  jsonOutput.style.margin = "20px auto";

  const copyButton = document.getElementById("copyButton");
  copyButton.style.display = "block";
}

function copyJSON() {
  const component_template = getComponentTemplate();
  if (!component_template) {
    return;
  }
  navigator.clipboard
    .writeText(JSON.stringify(component_template, null, 4))
    .then(() => {
      const alertBox = document.createElement("div");
      alertBox.textContent = "JSON copied to clipboard!";
      alertBox.style.position = "fixed";
      alertBox.style.bottom = "20px";
      alertBox.style.left = "50%";
      alertBox.style.bottom = "50%";
      alertBox.style.transform = "translate(-50%, 50%)";
      alertBox.style.backgroundColor = "#333333";
      alertBox.style.color = "#ffffff";
      alertBox.style.padding = "10px";
      alertBox.style.borderRadius = "5px";
      alertBox.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.3)";
      document.body.appendChild(alertBox);

      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 3000);
    })
    .catch((err) => alert("Failed to copy JSON: " + err));
}

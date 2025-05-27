// manifest-id-gen.cjs
const fs = require("fs");
const path = require("path");

function random19DigitId() {
    let id = "";
    for (let i = 0; i < 19; i++) {
        id += Math.floor(Math.random() * 10);
    }
    return id;
}

const manifestPath = path.resolve(__dirname, "manifest.json");
const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : {};

manifest.id = random19DigitId();

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("manifest.json id updated:", manifest.id);

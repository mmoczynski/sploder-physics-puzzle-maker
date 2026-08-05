import fs from "fs";

if(!fs.existsSync("./outDir/index.js")) {
    throw "Out file for TypeScript does not exist. Try running `npx tsc` to make it exist";
    exit(1);
};

const config = {
  entry: "./outdir/index.js",
}

export default config;
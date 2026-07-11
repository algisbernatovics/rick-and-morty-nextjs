import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const source = join(root, "public", "googled7cb6c8b4b7e6ade.html");
const content = readFileSync(source, "utf8");

writeFileSync(join(root, "out", "googled7cb6c8b4b7e6ade.html"), content);
writeFileSync(join(root, "out", "googled7cb6c8b4b7e6ade"), content);

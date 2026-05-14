import { rmSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

rmSync(join(cwd(), ".next"), { force: true, recursive: true });

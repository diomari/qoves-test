import { execSync } from "node:child_process";
import { rmSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

try {
  const pids = execSync("lsof -ti tcp:3000", { encoding: "utf8" })
    .split(/\s+/)
    .map((pid) => Number(pid))
    .filter(Boolean);

  for (const pid of pids) {
    try {
      process.kill(pid, "SIGTERM");
    } catch {
      // ignore
    }
  }
} catch {
  // no listener on port 3000
}

rmSync(join(cwd(), ".next"), { force: true, recursive: true });

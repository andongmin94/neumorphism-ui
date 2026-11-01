import { spawn } from "node:child_process";
import { stripVTControlCharacters } from "node:util";

// Answer only the explicitly named fixture file. Keep reading output until the
// entire command finishes, rejecting unexpected overwrite prompts as well.
export function run(command, args, cwd, timeout = 300_000, overwrite = null) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: overwrite ? ["pipe", "pipe", "pipe"] : ["ignore", "inherit", "inherit"], env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" } });
    let error;
    let answered = false;
    let buffer = "";
    const fail = message => { error = new Error(message); child.kill("SIGKILL"); };
    const timer = setTimeout(() => fail(`Command timed out: ${command}`), timeout);
    if (overwrite) {
      const output = (chunk, stream) => {
        stream.write(chunk);
        buffer = (buffer + stripVTControlCharacters(chunk.toString())).slice(-8192);
        const prompts = [...buffer.matchAll(/The file (\S+) already exists\. Would you like to overwrite\?/g)];
        for (const prompt of prompts) {
          if (prompt[1] !== overwrite.file) { fail(`Unexpected overwrite prompt: ${prompt[1]}`); return; }
        }
        if (answered || prompts.length === 0) return;
        answered = true;
        // The CLI's prompt library otherwise keeps its resumed input stream open
        // even after finishing its work. EOF does not replace waiting for exit.
        child.stdin.end(overwrite.allow ? "y" : "n");
      };
      child.stdout.on("data", chunk => output(chunk, process.stdout));
      child.stderr.on("data", chunk => output(chunk, process.stderr));
      child.stdin.on("error", problem => fail(problem.message));
    }
    child.once("error", problem => { clearTimeout(timer); reject(problem); });
    child.once("close", (code, signal) => {
      clearTimeout(timer);
      if (error) reject(error);
      else if (code !== 0) reject(new Error(`${command}: exit ${code}, signal ${signal}`));
      else if (overwrite && !answered) reject(new Error(`Missing overwrite prompt for ${overwrite.file}`));
      else resolve();
    });
  });
}

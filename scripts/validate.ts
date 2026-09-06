import { printReport, runValidation } from "../src/validation";

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const modelFlag = process.argv.find((a) => a.startsWith("--model="));
const id = args[0];

if (!id) {
  console.error("Usage: bun run validate -- <composition-id> [--model=...]");
  process.exit(1);
}

runValidation(id, modelFlag ? { model: modelFlag.split("=")[1] } : {})
  .then((report) => {
    printReport(report);
    process.exit(report.verdict === "PASS" ? 0 : 1);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });

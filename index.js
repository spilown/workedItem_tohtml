import fs from "fs";
import { parse } from "csv-parse";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const parser = parse({ delimiter: ",", columns: true }, function (err, data) {
  if (err) {
    console.error(err);
    return;
  }
  // console.log("import.meta.url", import.meta.url + " __dirname:", __dirname);
  // console.log("length:", data.length, data);

  const restructedArr = data
    .map((el) => {
      return `
    <li>
      <a class="caption" style="text-decoration: none;" href="https://dev.azure.com/SKEO2O/SKEO2O%20Project/_workitems/edit/${el.ID}/">BUG ${el.ID} </a>
      <span>${el.Title} </span>
    </li>
    `;
    })
    .join("");

  console.log("restructedArr:", restructedArr);
});

//파일명 !!
fs.createReadStream(__dirname + "/import.csv").pipe(parser);

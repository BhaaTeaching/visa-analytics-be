import * as xlsx from "xlsx";
import * as fs from "fs";

export const readeExcelFile = () => {
  // Specify the path to your Excel file
  const filePath = "rep9.xlsx";

  const workbook: xlsx.WorkBook = xlsx.readFile(filePath);

  // Choose the sheet you want to read (e.g., the first sheet)
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: xlsx.WorkSheet = workbook.Sheets[sheetName];

  // Convert the worksheet data to a JSON array
  const rawData: any[] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  // Define an object to map column indices to custom headers
  const headers: { [key: string]: string } = {
    "0": "תאריך עסקה",
    "1": "שם בית עסק",
    "2": "סכום עסקה",
    "3": "סכום חיוב",
    "4": "סוג עסקה",
    "5": "ענף",
    "6": "הערות",
  };

  // Map the raw data to include custom headers
  const data: any[] = rawData.map((row) => {
    const rowData: any = {};
    for (const [index, header] of Object.entries(headers)) {
      rowData[header] = row[index];
    }
    return rowData;
  });

  return aggregateData(data);
};

interface Transaction {
  "תאריך עסקה": string;
  "שם בית עסק": string;
  "סכום עסקה": number;
  "סכום חיוב": number;
  "סוג עסקה": string;
  ענף: string;
  הערות: string;
}
const aggregateData = (data: Transaction[]) => {
  // Your JSON data
  const jsonData: Transaction[] = data;

  // Create an object to store the sums
  const sums: { [branch: string]: number } = {};

  // Iterate through the transactions and calculate the sums
  jsonData.forEach((transaction) => {
    const branch = transaction["ענף"];
    const amount = transaction["סכום עסקה"];

    if (branch && amount !== undefined) {
      sums[branch] = (sums[branch] || 0) + amount;
    }
  });

  // Create an array of objects with branch and sum
  const result = Object.entries(sums)
    .map(([branch, sum]) => ({
      ענף: branch,
      סכום: sum,
    }))
    .sort((a, b) => a["סכום"] - b["סכום"]);

  // Print the aggregated data
  console.log(result);
  return result;
};

export const add = (a: number, b: number) => a + b;

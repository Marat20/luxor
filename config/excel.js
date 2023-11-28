export const writeToExcel = (arr, workbook, worksheet) => {
  arr.forEach((row) => {
    worksheet.addRow([row]);
  });

  workbook.xlsx.writeFile("./myFile.xlsx");

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.value = null;
    });
  });
};

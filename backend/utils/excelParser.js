const ExcelJS = require('exceljs');

/**
 * Parses an Excel file and returns an array of student objects.
 * @param {Buffer} fileBuffer - The buffer of the uploaded Excel file.
 * @returns {Promise<Array>} - Returns a promise that resolves with an array of student objects.
 */
const parseExcelFile = async (fileBuffer) => {
    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(fileBuffer);

        const worksheet = workbook.getWorksheet(1); // Assuming data is in the first sheet
        const students = [];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { // Skip the header row
                students.push({
                    rollNumber: row.getCell(1).value,
                    name: row.getCell(2).value,
                    semester: row.getCell(3).value,
                    branch: row.getCell(4).value,
                    CGPA: parseFloat(row.getCell(5).value), // Convert to float for CGPA
                    email: row.getCell(6).value,
                    phone: row.getCell(7).value.toString(), // Convert to string to avoid number formatting issues
                    currentSubjects: row.getCell(8).value ? row.getCell(8).value.split(',') : [], // Convert to array
                });
            }
        });

        return students;
    } catch (error) {
        console.error("Error parsing Excel file:", error);
        throw new Error("Failed to process Excel file");
    }
};

module.exports = parseExcelFile;

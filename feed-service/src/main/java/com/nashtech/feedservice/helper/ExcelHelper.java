package com.nashtech.feedservice.helper;

import com.nashtech.feedservice.model.Nasher;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;

public class ExcelHelper {
    private static final Logger logger = LogManager.getLogger(ExcelHelper.class);
    private static final String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    private static final String[] HEADERs = {"Employee Number/Id", "Full Name", "Email", "Jop Title/Designation", "Reporting Manager/RM/ Line Manager", "GitHub User"};
    private static final Map<String, List<String>> HEADERS = Map.of("EmpName", List.of("Employee Number", "Employee Id"));
    private static final String SHEET = "Nashers";

    public static boolean hasExcelFormat(MultipartFile file) {
        return TYPE.equals(file.getContentType());
    }

    public static ByteArrayInputStream nashersToExcel(List<Nasher> Nashers) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            for (int col = 0; col < HEADERs.length; col++) {
                Cell cell = headerRow.createCell(col);
                cell.setCellValue(HEADERs[col]);
            }

            int rowIdx = 1;
            for (Nasher Nasher : Nashers) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(Nasher.getEmpId());
                row.createCell(1).setCellValue(Nasher.getName());
                row.createCell(2).setCellValue(Nasher.getDesignation());
                row.createCell(3).setCellValue(Nasher.getReportingManager());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }


    public static List<Nasher> processExcelFile(InputStream is) throws IOException {
        List<Nasher> nashers = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(is);

        Sheet sheet = workbook.getSheet("Nashers");

        //for (int sheetIndex = 0; sheetIndex < workbook.getNumberOfSheets(); sheetIndex++) {
        // sheet = workbook.getSheetAt(sheetIndex);
        if (sheet == null) {
            sheet = workbook.getSheetAt(0);
            if (sheet == null) {
                throw new IOException("Sheet named [" + sheet + "] not found in the Excel file.");
            }
        }

        if (!presentColumnHeaders(sheet)) {
            //continue;
            throw new IOException("Invalid column headers in the Excel sheet. Expected: Name, Age, Email");
        }

        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next(); // Skip the header row

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            nashers.add(createNasherFromRow(row));
        }
        //}
        return nashers;
    }

    private static Nasher createNasherFromRow(Row row) {
        return new Nasher(
                getCellValueAsString(row.getCell(0)),
                getCellValueAsString(row.getCell(1)),
                getCellValueAsString(row.getCell(2)),
                getCellValueAsString(row.getCell(3)),
                getCellValueAsString(row.getCell(4)),
                getCellValueAsString(row.getCell(5))
        );
    }

    private static String getCellValueAsString(Cell cell) {
        return cell.getStringCellValue();
    }

    private static boolean presentColumnHeaders(Sheet sheet) {
        Row headerRow = sheet.getRow(0);

        if (headerRow == null) {
            logger.error("Header row not found in the Excel sheet.");
            return false;
            //throw new IOException("Header row not found in the Excel sheet.");
        }

        Cell[] cells = new Cell[HEADERs.length];
        for (int i = 0; i < HEADERs.length; i++) {
            cells[i] = headerRow.getCell(i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        }

        logger.info("System Acceptable Header Order In a Sheet {} ", Arrays.asList(HEADERs));
        logger.info("UPLOADED SHEET HEADER  Vs SYSTEM ACCEPTABLE SHEET HEADER");
        logger.info("---------------------     ------------------------------");
        for (int i = 0; i < HEADERs.length; i++) {
            logger.error(cells[i].getStringCellValue() + " | {} ", HEADERs[i]);
            if (!HEADERs[i].contains(cells[i].getStringCellValue())) {
                logger.error("Header mismatch {} :", cells[i].getStringCellValue());
                return false;
                //throw new IOException("Invalid column header in the Excel sheet. Expected: " + HEADERs[i]);
            }
        }
        return true;
    }

}
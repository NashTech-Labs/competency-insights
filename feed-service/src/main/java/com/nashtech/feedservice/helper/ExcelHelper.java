package com.nashtech.feedservice.helper;

import com.nashtech.feedservice.config.WorkbookProperties;
import com.nashtech.feedservice.exception.InvalidHeaderException;
import com.nashtech.feedservice.model.Nasher;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellValue;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.FormulaEvaluator;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Component
@AllArgsConstructor
@Slf4j
public class ExcelHelper {
    private final WorkbookProperties workbookProperties;
    private static final String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    private static final String SHEET = "Nashers";

    public boolean hasExcelFormat(MultipartFile file) {
        if (file.isEmpty()) {
            return false;
        }
        return TYPE.equals(file.getContentType());
    }

    public ByteArrayInputStream nashersToExcel(List<Nasher> Nashers) {

        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
            Sheet sheet = workbook.createSheet(SHEET);

            // Header
            Row headerRow = sheet.createRow(0);

            Iterator<String> it = workbookProperties.getHeaders().iterator();
            int cellCount = 0;
            while (it.hasNext()) {
                Cell cell = headerRow.createCell(cellCount);
                cell.setCellValue(it.next());
                cellCount++;
            }

            int rowIdx = 1;
            for (Nasher nasher : Nashers) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(nasher.getEmpId());
                row.createCell(1).setCellValue(nasher.getName());
                row.createCell(2).setCellValue(nasher.getDesignation());
                row.createCell(3).setCellValue(nasher.getReportingManager());
                row.createCell(4).setCellValue(nasher.getDateOfBirth());
                row.createCell(5).setCellValue(nasher.getDateOfJoining());
                row.createCell(6).setCellValue(nasher.getEmail());
                row.createCell(7).setCellValue(nasher.getContact());
                row.createCell(8).setCellValue(nasher.getDepartment());
                row.createCell(9).setCellValue(nasher.getLocation());
                row.createCell(10).setCellValue(String.join(",", nasher.getReportingMembers()));
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }


    public List<Nasher> processExcelFile(InputStream is) throws IOException {
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

        presentColumnHeaders(sheet);

        Iterator<Row> rowIterator = sheet.iterator();
        rowIterator.next(); // Skip the header row

        while (rowIterator.hasNext()) {
            Row row = rowIterator.next();
            nashers.add(createNasherFromRow(row));
        }
        //}
        return nashers;
    }

    private Nasher createNasherFromRow(Row row) {
        return new Nasher(
                getCellValueAsString(row.getCell(0)),
                getCellValueAsString(row.getCell(1)),
                getCellValueAsString(row.getCell(2)),
                getCellValueAsString(row.getCell(3)),
                getCellValueAsString(row.getCell(4)),
                getCellValueAsString(row.getCell(5)),
                getCellValueAsString(row.getCell(6)),
                getCellValueAsString(row.getCell(7)),
                getCellValueAsString(row.getCell(8)),
                getCellValueAsString(row.getCell(9)),
                Collections.singletonList(getCellValueAsString(row.getCell(10)))
        );
    }

    private String getCellValueAsString(Cell cell) {
        if (cell == null) {
            return "";
        }
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:

                if (DateUtil.isCellDateFormatted(cell)) {

                    DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    return df.format(cell.getDateCellValue());
                } else {

                    return String.valueOf((long) cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:

                try {
                    FormulaEvaluator evaluator = cell.getSheet().getWorkbook().getCreationHelper().createFormulaEvaluator();
                    CellValue cellValue = evaluator.evaluate(cell);
                    return cellValue.formatAsString();
                } catch (Exception e) {
                    return cell.getCellFormula();
                }
            default:
                return "";
        }
    }

    private void presentColumnHeaders(Sheet sheet) {
        Row headerRow = sheet.getRow(0);

        if (headerRow == null) {
            log.error("Header row not found in the Excel sheet.");
            throw new InvalidHeaderException("Header row not found in the Excel workbook.");
        }

        int headersSize = workbookProperties.getHeaders().size();
        Cell[] cells = new Cell[headersSize];
        for (int i = 0; i < headersSize; i++) {
            cells[i] = headerRow.getCell(i, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        }

        for (int i = 0; i < headersSize; i++) {
            if (!workbookProperties.getHeaders().contains(cells[i].getStringCellValue().toLowerCase())) {
                log.info("Acceptable header order in the system for a spreadsheet: {} ", workbookProperties.getHeaders());
                String errorMessage = String.format("Invalid column headers [%s] in the Excel workbook! Expected Headers: %s",
                        cells[i].getStringCellValue(), workbookProperties.getHeaders());
                log.error(errorMessage);
                throw new InvalidHeaderException(errorMessage);
            }
        }
    }

}
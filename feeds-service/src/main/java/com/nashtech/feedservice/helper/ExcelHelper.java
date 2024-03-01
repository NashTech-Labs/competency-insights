package com.nashtech.feedservice.helper;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.nashtech.feedservice.model.Nasher;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;


public class ExcelHelper {
  public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
  static String[] HEADERs = { "Employee Id", "Full Name", "Jop Title", "Reporting Manager" };
  static String SHEET = "Nashers";

  public static boolean hasExcelFormat(MultipartFile file) {

    if (!TYPE.equals(file.getContentType())) {
      return false;
    }

    return true;
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

  public static List<Nasher> excelToNashers(InputStream is) {
    try {
      Workbook workbook = new XSSFWorkbook(is);

      Sheet sheet = workbook.getSheet(SHEET);
      Iterator<Row> rows = sheet.iterator();

      List<Nasher> Nashers = new ArrayList<>();

      int rowNumber = 0;
      while (rows.hasNext()) {
        Row currentRow = rows.next();

        // skip header
        if (rowNumber == 0) {
          rowNumber++;
          continue;
        }

        Iterator<Cell> cellsInRow = currentRow.iterator();

        Nasher Nasher = new Nasher();

        int cellIdx = 0;
        while (cellsInRow.hasNext()) {
          Cell currentCell = cellsInRow.next();

          switch (cellIdx) {
          case 0:
            Nasher.setEmpId(String.valueOf(currentCell.getNumericCellValue()));
            break;

          case 1:
            Nasher.setName(currentCell.getStringCellValue());
            break;

          case 2:
            Nasher.setDesignation(currentCell.getStringCellValue());
            break;

          case 3:
            Nasher.setReportingManager(String.valueOf(currentCell.getBooleanCellValue()));
            break;

          default:
            break;
          }

          cellIdx++;
        }

        Nashers.add(Nasher);
      }

      workbook.close();

      return Nashers;
    } catch (IOException e) {
      throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
    }
  }
}
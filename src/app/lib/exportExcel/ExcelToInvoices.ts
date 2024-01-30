'use client'

import * as ExcelJS from 'exceljs';

const headers = ['ID', 'Forma de Pago', 'Mesero', 'Total C$', 'Total U$', 'Propina C$', 'Propina U$', 'Fecha Emision', 'Hora Emision'];

export async function ExcelToInvoice(Invoice: any, startDate? : string, endDate? : string) {

    let information = ''
    if (startDate && endDate) {
        information = `Periodo del ${startDate} al ${endDate}`
    } else {
        information = 'Facturas realizadas'
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(information);

    worksheet.mergeCells('A1:I1');
    const title = worksheet.getCell('A1');
    title.font = { name: 'Arial Black', size: 18 };
    title.alignment = { horizontal: 'center' };
    title.value = `Sakura Coffee Shop`;
    title.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    worksheet.mergeCells('A2:I2');
    const subTitle = worksheet.getCell('A2');
    subTitle.font = { name: 'Arial', size: 16 };
    subTitle.alignment = { horizontal: 'center' };
    subTitle.value = `Registro de Facturas`;
    subTitle.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    
    worksheet.mergeCells('A3:I3');
    const info = worksheet.getCell('A3');
    info.font = { name: 'Arial', size: 12 };
    info.alignment = { horizontal: 'center' };
    info.value = information;
    info.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    
    // Define la fila donde deseas colocar las cabeceras
    let rowIndex = 4;
    let row = worksheet.getRow(rowIndex);
    
    // Asigna cada cabecera a una celda en la fila seleccionada.
    for (let i = 0; i < headers.length; i++) {
        let cell = row.getCell(i + 1); // Los índices de las celdas comienzan en 1.
        cell.value = headers[i];
        cell.font = { name: 'Arial', bold: true, color: { argb: 'FFFF7F00' } };
        cell.alignment = { horizontal: 'center' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDF5E6' } };
        if(headers[i] === 'ID') {
            worksheet.getColumn(i + 1).width = 8;
        } else {
            worksheet.getColumn(i + 1).width = 16;

        }
    }
    
    rowIndex++;

    for (let j = 0; j < Invoice.length; j++) {
        let invoiceRow = worksheet.getRow(j + rowIndex);
        invoiceRow.getCell(1).value = Invoice[j].numero_factura.toString();
        invoiceRow.getCell(2).value = Invoice[j].metodo_pago;
        invoiceRow.getCell(3).value = Invoice[j].users.name;
        invoiceRow.getCell(4).value = Invoice[j].total_C_;
        invoiceRow.getCell(5).value = Invoice[j].total_U_;
        invoiceRow.getCell(6).value = Invoice[j].propina_C_;
        invoiceRow.getCell(7).value = Invoice[j].propina_U_;
        invoiceRow.getCell(8).value = Invoice[j].fecha_emision;
        invoiceRow.getCell(9).value = (new Date(Invoice[j].hora_emision).toLocaleString()).split(',')[1];
        

        invoiceRow.eachCell({ includeEmpty: true }, function(cell, colNumber) {
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
        });
    }

    await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${information}.xlsx`;
        link.click();
    });
}
'use client'

import * as ExcelJS from 'exceljs';

const headersInvoice = ['ID', 'Forma de Pago', 'Mesero', 'Total C$', 'Total U$', 'Propina C$', 'Propina U$', 'Fecha Emision', 'Hora Emision'];

const headersFlowCash = ['ID', 'Fecha Apertura', 'Hora Apertura', 'Fecha Cierre', 'Hora Cierre', 'Monto Inicial C$', 'Monto Inicial U$', 'Monto Final C$', 'Monto Final U$', 'Faltante', 'Sobrante', 'Usuario', 'Observaciones'];

const rangeOfInvoice = {
    title1: 'A1:I1',
    title2: 'A2:I2',
    title3: 'A3:I3'
}

const rangeOfFLowCash = {
    title1: 'A1:M1',
    title2: 'A2:M2',
    title3: 'A3:M3'
}


export async function CreateExcel( data: any, from : string, startDate? : string, endDate? : string ) {

    let information = ''
    if (startDate && endDate) {
        information = `${from} del ${startDate} al ${endDate}`
    } else {
        information = `${from} realizadas`
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet( from );

    let rangeCell = null
    if (from === 'Facturas') {
        rangeCell = rangeOfInvoice
    } else {
        rangeCell = rangeOfFLowCash
    }

    worksheet.mergeCells(rangeCell.title1);
    const title = worksheet.getCell('A1');
    title.font = { name: 'Arial Black', size: 18 };
    title.alignment = { horizontal: 'center' };
    title.value = `Sakura Coffee Shop`;
    title.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    worksheet.mergeCells(rangeCell.title2);
    const subTitle = worksheet.getCell('A2');
    subTitle.font = { name: 'Arial', size: 16 };
    subTitle.alignment = { horizontal: 'center' };
    subTitle.value = `Registro de ${from}`;
    subTitle.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    
    worksheet.mergeCells(rangeCell.title3);
    const info = worksheet.getCell('A3');
    info.font = { name: 'Arial', size: 12 };
    info.alignment = { horizontal: 'center' };
    info.value = information;
    info.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    
    // Define la fila donde deseas colocar las cabeceras
    let rowIndex = 4;
    let row = worksheet.getRow(rowIndex);
    
    // Asigna cada cabecera a una celda en la fila seleccionada.
    let headers = null;
    if (from === 'Facturas') {
        headers = headersInvoice
    } else {
        headers = headersFlowCash
    }
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
            worksheet.getColumn(i + 1).width = 18;

        }
    }
    
    // TODO: Integrar correctamente las horas en las hojas de excel. 

    rowIndex++;

    if (from === 'Facturas') {
        for (let j = 0; j < data.length; j++) {
            let invoiceRow = worksheet.getRow(j + rowIndex);
            invoiceRow.getCell(1).value = data[j].numero_factura.toString();
            invoiceRow.getCell(2).value = data[j].metodo_pago;
            invoiceRow.getCell(3).value = data[j].users.name;
            invoiceRow.getCell(4).value = data[j].total_C_;
            invoiceRow.getCell(5).value = data[j].total_U_;
            invoiceRow.getCell(6).value = data[j].propina_C_;
            invoiceRow.getCell(7).value = data[j].propina_U_;
            invoiceRow.getCell(8).value = data[j].fecha_emision;
            invoiceRow.getCell(9).value = (new Date(data[j].hora_emision).toLocaleString()).split(',')[1];
            
    
            invoiceRow.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
        }
    } else {
        for (let j = 0; j < data.length; j++) {
            let invoiceRow = worksheet.getRow(j + rowIndex);
            invoiceRow.getCell(1).value = data[j].id.toString();
            invoiceRow.getCell(2).value = data[j].fecha_apertura;
            invoiceRow.getCell(3).value = data[j].hora_apertura;
            invoiceRow.getCell(4).value = data[j].fecha_cierre;
            invoiceRow.getCell(5).value = data[j].hora_cierre;
            invoiceRow.getCell(6).value = data[j].monto_inicial_C_;
            invoiceRow.getCell(7).value = data[j].monto_inicial_U_;
            invoiceRow.getCell(8).value = data[j].monto_final_C_;
            invoiceRow.getCell(9).value = data[j].monto_final_U_;
            invoiceRow.getCell(10).value = data[j].faltante_caja;
            invoiceRow.getCell(11).value = data[j].sobrante_caja;
            invoiceRow.getCell(12).value = data[j].users.name;
            invoiceRow.getCell(13).value = data[j].observaciones;
            
    
            invoiceRow.eachCell({ includeEmpty: true }, function(cell, colNumber) {
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
        }
    }

    await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${information}.xlsx`;
        link.click();
    });
}
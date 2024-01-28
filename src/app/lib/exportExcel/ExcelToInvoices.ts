'use client'

import * as ExcelJS from 'exceljs';

export async function ExcelToInvoice(Invoice: any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Facturas');

    const headers = ['ID', 'Forma de Pago', 'Mesero', 'Total C$', 'Total U$', 'Propina C$', 'Propina U$', 'Fecha Emision', 'Hora Emision'];

    // Define la fila donde deseas colocar las cabeceras. En este caso, es la tercera fila.
    let rowIndex = 1;
    let row = worksheet.getRow(rowIndex);
    
    // Asigna cada cabecera a una celda en la fila seleccionada.
    for (let i = 0; i < headers.length; i++) {
        let cell = row.getCell(i + 1); // Los índices de las celdas comienzan en 1.
        cell.value = headers[i];
        cell.font = { name: 'Arial', bold: true, color: { argb: 'FFFF7F00' } };
        cell.alignment = { horizontal: 'center' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDF5E6' } };
        worksheet.getColumn(i + 1).width = 28;
    }
    



    await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `Facturas.xlsx`;
        link.click();
    });
}
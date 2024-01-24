'use client'

import * as ExcelJS from 'exceljs';

let localDate = new Date().toLocaleDateString();
localDate = localDate.replace(/\//g, '-');
const nameSheet = `Cierre ${localDate}`;

export async function ExcelCloseCash(products: any[], info : any) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(nameSheet);

    worksheet.mergeCells('B2:E2');
    const cell = worksheet.getCell('B2');
    cell.font = { name: 'Arial Black', size: 16 };
    cell.alignment = { horizontal: 'center' };
    cell.value = `Ventas totales del dia ${localDate}`;
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Define las cabeceras
    const headers = ['Producto', 'Unidades', 'Precio', 'Total'];

    // Posiciona las cabeceras desde la celda B3 hasta la E3
    for (let i = 0; i < headers.length; i++) {
        const cell = worksheet.getCell(`${String.fromCharCode(66 + i)}${3}`);
        cell.value = headers[i];
        cell.font = { name: 'Arial', bold: true, color: { argb: 'FFFF7F00' } };
        cell.alignment = { horizontal: 'center' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFDF5E6' } };
        worksheet.getColumn(`${String.fromCharCode(66 + i)}`).width = 28;
    }

    // Agrega los productos
    const productsData = products.map(product => [null, product.producto, product.cantidad, product.price, product.total]);
    worksheet.addRows(productsData, 'n');

    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
    });

    // Agrega los totales
    worksheet.mergeCells('G2:H2');
    const cell2 = worksheet.getCell('G2');
    cell2.font = { name: 'Arial Black', size: 16, color: { argb: 'FFFFFF' } };
    cell2.alignment = { horizontal: 'center' };
    cell2.value = 'Movimientos';
    cell2.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    cell2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000000' } };

    const headers2 = ['SubTotal', 'Propina', 'Total'];

    for (let i = 0; i < headers2.length; i++) {
        const cell = worksheet.getCell(`${String.fromCharCode(71)}${i + 3}`); // Cambia 3 a i + 3
        cell.value = headers2[i];
        cell.font = { name: 'Arial', bold: true};
        cell.alignment = { horizontal: 'left' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getColumn(`${String.fromCharCode(71)}`).width = 24;
    }

    // Define los datos totales
    const totalData = [[info.subTotal], [info.propina], [info.total]];

    // Añade los datos totales a la hoja de trabajo
    for (let i = 0; i < totalData.length; i++) {
        const cell = worksheet.getCell(`${String.fromCharCode(72)}${i + 3}`);
        cell.value = `C$ ${totalData[i][0]}`;
        cell.font = { name: 'Arial'};
        cell.alignment = { horizontal: 'right' };
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getColumn(`${String.fromCharCode(71)}`).width = 20;
    }

    
    await workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${nameSheet}.xlsx`;
        link.click();
    });
}
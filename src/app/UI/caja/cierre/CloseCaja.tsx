'use client'


import { useEffect } from 'react';
import * as ExcelJS from 'exceljs';

export default function GenerateButton() {
    let localDate = new Date().toLocaleDateString();
    localDate = localDate.replace(/\//g, '-');
    const nameSheet = `Cierre ${localDate}`;

    const handleClick = async () => {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(nameSheet);
    
        worksheet.mergeCells('B2:E2');
        const cell = worksheet.getCell('B2');
        cell.font = { name: 'Arial Black', size: 16 };
        cell.alignment = { horizontal: 'center' };
        cell.value = `Ventas totales del dia ${localDate}`;
    
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
            worksheet.getColumn(`${String.fromCharCode(66 + i)}`).width = 32;
        }
    
        await workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'Test.xlsx';
            link.click();
        });
    };

    return <button onClick={handleClick}>Generate Excel</button>;
}

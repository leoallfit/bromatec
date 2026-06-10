// ============================================================
//  BROMATEC – CRM en Google Sheets
//  Recibe los datos del formulario del sitio y los guarda como
//  una fila nueva en tu planilla. Columnas dinámicas: se adaptan
//  solos a los campos del formulario (no hay que tocar nada acá).
//
//  >>> Pegá TODO este código en Google Apps Script y deployalo
//      como Aplicación web. Instrucciones al final del archivo. <<<
// ============================================================

const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

    // El formulario manda como form-urlencoded (campos en e.parameter).
    // Si en cambio viniera JSON puro (versiones viejas), parseamos e.postData.contents.
    var data;
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); }
      catch (parseErr) { data = {}; }
    } else {
      data = {};
    }

    // ── Columnas fijas siempre primero ──
    var FIXED = ['Fecha', 'Estado'];

    // ── Obtener / crear cabeceras ──
    var headers;
    if (sheet.getLastRow() === 0) {
      var dynamicKeys = Object.keys(data).filter(function(k){ return k !== '_fecha'; });
      headers = FIXED.concat(dynamicKeys);
      sheet.appendRow(headers);

      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#0C3B26');   // verde BROMATEC
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
      sheet.setFrozenRows(1);
      sheet.setColumnWidth(1, 160);  // Fecha
      sheet.setColumnWidth(2, 130);  // Estado

    } else {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // ── Agregar columnas nuevas si el form trae campos extra ──
    Object.keys(data).forEach(function(key){
      if (key === '_fecha') return;
      if (headers.indexOf(key) === -1) {
        headers.push(key);
        var newColRange = sheet.getRange(1, headers.length);
        newColRange.setValue(key);
        newColRange.setBackground('#0C3B26');
        newColRange.setFontColor('#ffffff');
        newColRange.setFontWeight('bold');
      }
    });

    // ── Armar fila ──
    var fecha = data['_fecha'] ? new Date(data['_fecha']) : new Date();
    var row = headers.map(function(h){
      if (h === 'Fecha')  return fecha;
      if (h === 'Estado') return 'Nuevo';
      return data[h] !== undefined ? data[h] : '';
    });

    sheet.appendRow(row);
    var lastRow = sheet.getLastRow();

    // ── Desplegable de Estado (para hacer seguimiento) ──
    var estadoCol = headers.indexOf('Estado') + 1;
    if (estadoCol > 0) {
      var rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(['Nuevo', 'Contactado', 'Visita agendada', 'Presupuesto enviado', 'Cliente', 'Descartado'], true)
        .build();
      sheet.getRange(lastRow, estadoCol).setDataValidation(rule);
      sheet.getRange(lastRow, estadoCol).setBackground('#FEF3C7').setFontColor('#92400E');
    }

    // ── Filas alternadas (zebra) ──
    var rowBg = (lastRow % 2 === 0) ? '#F4F6F5' : '#FFFFFF';
    sheet.getRange(lastRow, 1, 1, headers.length).setBackground(rowBg);

    // (Opcional) avisarte por mail de cada lead nuevo: descomentá y poné tu correo
    // MailApp.sendEmail('tucorreo@ejemplo.com', 'Nuevo lead BROMATEC', JSON.stringify(data, null, 2));

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('BROMATEC CRM – OK');
}

// ============================================================
//  CÓMO PONERLO EN MARCHA (una sola vez)
//
//  1. Creá una planilla nueva en Google Sheets (sheets.new).
//  2. En esa planilla: menú  Extensiones → Apps Script.
//  3. Borrá lo que haya y pegá TODO este archivo. Guardá (Ctrl+S).
//  4. Arriba a la derecha: "Implementar" → "Nueva implementación".
//     - Engranaje ⚙ → tipo "Aplicación web".
//     - Ejecutar como:  Yo (tu cuenta).
//     - Quién tiene acceso:  Cualquier persona.
//     - "Implementar".  (La primera vez te pide autorizar: aceptá.)
//  5. Copiá la "URL de la aplicación web" (termina en /exec).
//  6. Pegá esa URL en el sitio:
//        Panel (triple clic esquina inf. izq. → contraseña)
//        → Formulario → campo "Google Sheets (CRM)" → Guardar.
//     (Y publicá con el token para que quede en todos los dispositivos.)
//
//  Listo: cada persona que complete el formulario aparece como una
//  fila nueva en la planilla, con Fecha y un Estado editable.
// ============================================================

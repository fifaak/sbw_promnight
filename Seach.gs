function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
  .setTitle('SBW Prom Night ')
  .addMetaTag('viewport', 'width=device-width, inital-scale=1')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}




/* PROCESS FORM */
function processForm(formObject){  
  var result = "";
  if(formObject.searchtext){//Execute if form passes search text
      result = search(formObject.searchtext);
  }
  return result;
}

function writeData(spreadsheet, sheetName, data) {
  if (spreadsheet) {
    var sheet = spreadsheet.getSheetByName(sheetName);

    if (sheet) {
      var dateStamp = new Date().toLocaleString();
      if (data.length > 0) {
        var rowToWrite = [dateStamp].concat(data);
        var lastRow = sheet.getLastRow() + 1;
        var range = sheet.getRange(lastRow, 1, 1, rowToWrite.length);

        range.setValues([rowToWrite]);
      }
    } else {
      Logger.log('Sheet ' + sheetName + ' not found.');
    }
  } else {
    Logger.log('Spreadsheet not found.');
  }
}

function registerStudents(registrationData) {
  var spreadsheetId = '1XOoNJBsAoN0YqivV0vPKraoT_LWMeu7letJk-pSd-rI';
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  for (var i = 0; i < registrationData.length; i++) {
    var sheetName;

    if (registrationData[i]) {
      Logger.log('Data: ' + JSON.stringify(registrationData[i]));

      if (registrationData[i] === '1 ท่าน') {
        sheetName = 'Registration';
      } else if (registrationData[i] === '2 ท่าน') {
        sheetName = 'Registration2';
      }else if (registrationData[i] === '2Staff') {
        sheetName = 'Registration2'; 
      }else if (registrationData[i] === 'Staff') {
        sheetName = 'Registration';
      }

    }
  }
  if (sheetName) {
    writeData(spreadsheet, sheetName, registrationData);
    Logger.log('Data Written to ' + sheetName + ' Sheet.');
  } else {
    Logger.log('SheetName is undefined for data: ' + JSON.stringify(registrationData[i]));
  }
}





//SEARCH FOR MATCHED CONTENTS 
function search(searchtext) {
  var spreadsheetId = '1XOoNJBsAoN0YqivV0vPKraoT_LWMeu7letJk-pSd-rI'; 
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheetName = 'Registration';

  // Fetching data from columns A to G
  var dataRangeAtoG = 'One_Ticket!A2:G';
  var dataAtoG = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRangeAtoG).values || [];

  // Fetching data from columns H to S
  var dataRangeHtoS = 'One_Ticket!H2:S';
  var dataHtoS = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRangeHtoS).values || [];

  // Fetching data from column I
  var dataRangeColumnI = 'One_Ticket!X2:X';
  var dataColumnI = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRangeColumnI).values || [];

  var dataRangeColumnA = 'One_Ticket!A2:A';
  var datacolumA = Sheets.Spreadsheets.Values.get(spreadsheetId, dataRangeColumnA).values || [];

  var data = [];

  // Determine which range to use based on the value in column A
  for (var i = 0; i < dataAtoG.length; i++) {
    if (dataAtoG[i]) {
      var rowData = [];
      if (dataAtoG[i][0] === '1 ท่าน') {
        rowData = dataAtoG[i];
      } else if (dataAtoG[i][0] === '2 ท่าน') {
        rowData = datacolumA[i].concat(dataHtoS[i]);
      }else if (dataAtoG[i][0] === 'Staff'){
        rowData = dataAtoG[i];
      }else if (dataAtoG[i][0] === '2Staff') {
        rowData = datacolumA[i].concat(dataHtoS[i]);
      }if (rowData.length > 0) {
        var row = rowData.concat(dataColumnI[i] || []); // Concatenate column I to each row
        data.push(row);
      }
    }
  }

  var filteredData = [];
  

  // Filtering based on search text
  if (data) {
    data.forEach(function (row) {
      if (row.join(' ').toLowerCase().includes(searchtext.toLowerCase())) {
        filteredData.push(row);
      }
    });
  } 

  // Logging for debugging purposes
  Logger.log('Filtered Data: ' + JSON.stringify(filteredData));
  

  // Now 'filteredData' contains rows where searchtext is found in columns A to G or column I based on the condition
  return filteredData;

}







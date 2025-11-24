/**
 * Google Apps Script for Contact Form Submission
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Update the SHEET_NAME variable if your sheet name is different (default: "Sheet1")
 * 5. Click "Save" (Ctrl+S or Cmd+S)
 * 6. Click "Deploy" > "New deployment"
 * 7. Click the gear icon ⚙️ next to "Select type" and choose "Web app"
 * 8. Set the following:
 *    - Description: "Contact Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (or "Anyone with Google account" if you want to restrict)
 * 9. Click "Deploy"
 * 10. Copy the Web App URL
 * 11. Paste the URL in services/api.ts in the GOOGLE_SCRIPT_URL constant
 */

// Configuration
const SHEET_NAME = 'Sheet1'; // Change this if your sheet has a different name

/**
 * Main function to handle POST requests
 */
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      const newSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
      setupSheetHeaders(newSheet);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Sheet created. Please try submitting again.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Extract form data
    const name = data.name || '';
    const email = data.email || '';
    const phone = data.phone || '';
    const program = data.program || '';
    const message = data.message || '';
    const time = data.time || new Date().toLocaleTimeString();
    const date = data.date || new Date().toLocaleDateString();
    
    // Check if headers exist, if not, create them
    if (sheet.getLastRow() === 0) {
      setupSheetHeaders(sheet);
    }
    
    // Append the new row with data
    // Column order: Name, Email, Phone, Program, Message, Time, Date
    sheet.appendRow([
      name,
      email,
      phone,
      program,
      message,
      time,
      date
    ]);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Form submitted successfully',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error processing form: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Setup sheet headers if they don't exist
 */
function setupSheetHeaders(sheet) {
  // Clear any existing content
  sheet.clear();
  
  // Set headers with formatting
  const headers = ['Name', 'Email', 'Phone', 'Program', 'Message', 'Time', 'Date'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#2d5016'); // Dark green background
  headerRange.setFontColor('#ffffff'); // White text
  headerRange.setHorizontalAlignment('center');
  
  // Freeze header row
  sheet.setFrozenRows(1);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * GET function for testing (optional)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'Contact Form API is running',
    timestamp: new Date().toISOString(),
    sheet: SHEET_NAME
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - Run this manually to test the script
 */
function testSubmission() {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    program: 'Test Program',
    message: 'This is a test message',
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}


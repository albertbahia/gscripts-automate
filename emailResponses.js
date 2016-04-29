function emailPdfs() {
  // Get active spreadsheet
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // Get data from spreadsheet 
  var data = sheet.getDataRange().getValues();
  
  // Get google drive folder with survey responses
  var googleDriveFolder = DriveApp.getFoldersByName('RUT0125-0126FSF-Week-10-20160427162218-SurveyExport').next();
  var googleDriveFolderName = DriveApp.getFoldersByName('RUT0125-0126FSF-Week-10-20160427162218-SurveyExport').next().getName();
  var studentPdf;
  
  for (var i = 3; i < data.length; i++) {
    var surveygizmoId = data[i][0],
        fullName = data[i][1],
        firstName = fullName.split(' ')[0],
        lastName = fullName.split(' ')[1],
        emailAddress = data[i][2],
        cohortSection = data[i][3];
    
    var emailSubject = cohortSection + "-" + fullName + "-Week 10 Self Evaluation Results",
        emailMessage = "Hey " + firstName + ", attached are the results from your Week 10 Self Evaluation.  Here’s the link to the answer key => https://github.com/RutgersCodingBootcamp/01-16-NB-Class-Content/blob/master/Week10WhereAreYouQuestionandAnswerKey.pdf.",
        options;
    
    // Get specific pdf with surveygizmo id from google drive folder with the survey responses 
    studentPdf = googleDriveFolder.getFilesByName('PDFResponse-' + surveygizmoId +'.pdf').next();
    
    // Add cc
    // Conditional cc, for 0125 = Ahmed, for 0126 = John D
    // Attach individual student pdf
    if (cohortSection === 'RUT0125FSF') {
      options = {
        cc: "smaresco@ccpd.rutgers.edu,ahaque@ccpd.rutgers.edu",
        attachments: studentPdf
      }
    } else if (cohortSection === 'RUT0126FSF') {
      options = {
        cc: "smaresco@ccpd.rutgers.edu,jdougherty@ccpd.rutgers.edu",
        attachments: studentPdf
      }
    }
    
    // Logger.log() is specific to Google App Scripts. Logger.log() === console.log()
    Logger.log(i);
    Logger.log(surveygizmoId);
    Logger.log(fullName);
    Logger.log(firstName);
    Logger.log(lastName);
    Logger.log(emailAddress);
    Logger.log(cohortSection);
    Logger.log(emailSubject);
    Logger.log(emailMessage);
    Logger.log(options);
    Logger.log(' ');
    
    // Send email with student email address, tailored subject and message with Q&A pdf, cc Student Success email and specific instructor per cohort, and attach individual student pdf
    GmailApp.sendEmail(emailAddress, emailSubject, emailMessage, options);
  }
}

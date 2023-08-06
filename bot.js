// Configuration
var apiToken = "6338466934:AAH-xe_zLuPNWw2oF4phkkhCBHInB57xyuM";
var appUrl = "https://script.google.com/macros/s/AKfycbxEl6EH5c-nlJHBiOusmHl_dyQy9RN3jXYmjdA6Li0cdwiO3xAuF4KlcrpuU1utr-6-9Q/exec";
var apiUrl = "https://api.telegram.org/bot" + apiToken;

// Set webhook
function setWebhook() {
  var url = apiUrl + "/setwebhook?url=" + appUrl;
  var res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

// Handle webhook
function doPost(e) {
  var webhookData = JSON.parse(e.postData.contents);
  var message = webhookData.message;
  var chatType = message.chat.type; // Get the chat type (private, group, etc.)
  var from = message.from.id;
  var firstName = message.from.first_name;
  var username = message.from.username || firstName; // Use username if available, otherwise use first name
  var text = message.text ? message.text.toLowerCase() : ""; // Convert to lowercase for easier matching

  // Regular Expressions to identify user intents and include type, text, and url
  var intents = [
    // Human Normal Questions
    {
      regex: /pdf/,
      type: "document",
      text: "Sample PDF",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/a67cbbe3a1fcca52313b42dc777b3c5c067c2437/Resources/Questions/1st/1st_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/a67cbbe3a1fcca52313b42dc777b3c5c067c2437/Resources/Questions/1st/1st_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/a67cbbe3a1fcca52313b42dc777b3c5c067c2437/Resources/Questions/1st/1st_Mid_Aut22.pdf"
      ]
    },

    //   ##
    // ####
    //   ##
    //   ##
    // ######

    //1st Semester Mid Question
    { regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "1st Mid Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/a67cbbe3a1fcca52313b42dc777b3c5c067c2437/Resources/Questions/1st/1st_Mid_Aut22.pdf" },
    
    { regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring22|spring 22|sp22)\b)/i, type: "document", text: "1st Mid Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/a67cbbe3a1fcca52313b42dc777b3c5c067c2437/Resources/Questions/1st/1st_Mid_SP22.pdf" },
    {
      regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "1st All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/a67cbbe3a1fcca52313b42dc777b3c5c067c2437/Resources/Questions/1st/1st_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/a67cbbe3a1fcca52313b42dc777b3c5c067c2437/Resources/Questions/1st/1st_Mid_Aut22.pdf"
      ]
    },

    //1st Semester Final Question
    { regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(|aut22|aut 22|au22|Autumn22)\b)/i, type: "document", text: "1st Final Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Final_Aut22.pdf" },
    { regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring22|spring 22|sp22)\b)/i, type: "document", text: "1st Final Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Final_SP22.pdf" },
    {
      regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(final|final-term|finalterm)\b)(?=.*\b(question|questions)\b)(?=.*\b(all|total|every|full)\b)/i,
      type: "document",
      text: "1st All Final Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Final_SP22.pdf"
      ]
    },
    //1st Semester All Previous Year Question
    {
      regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "1st all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/1st/1st_Mid_Aut22.pdf"
      ]
    },


    //  ######
    // ##    ##
    //      ##
    //    ##
    // #########


    //2nd Semester Mid Question
    { regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "2nd Mid Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_Aut22.pdf" },
  
    { regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring22|spring 22|sp22)\b)/i, type: "document", text: "2nd Mid Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_SP22.pdf" },
    
    { regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring23|spring 23|sp23)\b)/i, type: "document", text: "2nd Mid Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_SP23.pdf" },
    {
      regex: /^(?=.*\b(1st|1|first)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "2nd All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_SP23.pdf"

      ]
    },

    //2nd Semester Final Question
    { regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "2nd Final Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_Aut22.pdf" },
  
    { regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring22|spring 22|sp22)\b)/i, type: "document", text: "2nd Final Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_SP22.pdf" },
    
    { regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring23|spring 23|sp23)\b)/i, type: "document", text: "2nd Final Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_SP23.pdf" },
    {
      regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(final|finalterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "2nd All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_SP23.pdf"

      ]
    },

    //2nd Semester All Question
    {
      regex: /^(?=.*\b(2nd|2|second)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "2nd all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Mid_SP23.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/2nd/2nd_Final_SP23.pdf"
      ]
    },

    // ######
    //      ##
    //  ######
    //      ##
    // ######


    //3rd Semester Mid Question
    { regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "3rd Mid Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_Aut22.pdf" },

    { regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring22|spring 22|sp22)\b)/i, type: "document", text: "3rd Mid Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_SP22.pdf" },

    { regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring23|spring 23|sp23)\b)/i, type: "document", text: "3rd Mid Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_SP23.pdf" },
    {
      regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "3rd All Mid Previous Question",
      urls: [
      "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_Aut22.pdf",
      "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_SP22.pdf",
      "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_SP23.pdf"

      ]
    },

    //3rd Semester Final Question
    { regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "3rd Final Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_Aut22.pdf" },

    { regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring22|spring 22|sp22)\b)/i, type: "document", text: "3rd Final Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_SP22.pdf" },

    { regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(spring23|spring 23|sp23)\b)/i, type: "document", text: "3rd Final Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_SP23.pdf" },
    {
      regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(final|finalterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "3rd All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_SP23.pdf"

      ]
    },

    //3rd Semester All Question
    {
      regex: /^(?=.*\b(3rd|3|third)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "3rd all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Mid_SP23.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/3rd/3rd_Final_SP23.pdf"
      ]
    },




    // 4th Semester Mid Question
    { regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "4th Mid Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_Aut21.pdf" },

    { regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "4th Mid Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_Aut22.pdf" },

    { regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp23|sp 23|spring 23)\b)/i, type: "document", text: "4th Mid Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_SP23.pdf" },

    {
      regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "4th All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_SP23.pdf"
      ]
    },

    // 4th Semester Final Question
    { regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "4th Final Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_Aut21.pdf" },

    { regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "4th Final Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_Aut22.pdf" },

    { regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp23|sp 23|spring 23)\b)/i, type: "document", text: "4th Final Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_SP23.pdf" },

    {
      regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(final|finalterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "4th All Final Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_SP23.pdf"
      ]
    },

    // 4th Semester All Question
    {
      regex: /^(?=.*\b(4th|4|fourth)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "4th all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Mid_SP23.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/4th/4th_Final_SP23.pdf"
      ]
    },




    // 5th Semester Mid Question
    { regex: /^(?=.*\b(5th|5|fifth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp22|sp 22|spring 22)\b)/i, type: "document", text: "5th Mid Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Mid_SP22.pdf" },

    { regex: /^(?=.*\b(5th|5|fifth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp23|sp 23|spring 23)\b)/i, type: "document", text: "5th Mid Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Mid_SP23.pdf" },

    {
      regex: /^(?=.*\b(5th|5|fifth)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "5th All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Mid_SP23.pdf"
      ]
    },

    // 5th Semester Final Question
    { regex: /^(?=.*\b(5th|5|fifth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp22|sp 22|spring 22)\b)/i, type: "document", text: "5th Final Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Final_SP22.pdf" },

    { regex: /^(?=.*\b(5th|5|fifth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp23|sp 23|spring 23)\b)/i, type: "document", text: "5th Final Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Final_SP23.pdf" },

    {
      regex: /^(?=.*\b(5th|5|fifth)\b)(?=.*\b(final|finalterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "5th All Final Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Final_SP23.pdf"
      ]
    },

    // 5th Semester All Question
    {
      regex: /^(?=.*\b(5th|5|fifth)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "5th all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Mid_SP23.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Final_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/5th/5th_Final_SP23.pdf"
      ]
    },



    
    // 6th Semester Mid Question
    { regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "6th Mid Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_Aut21.pdf" },

    { regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "6th Mid Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_Aut22.pdf" },

    { regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp23|sp 23|spring 23)\b)/i, type: "document", text: "6th Mid Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_SP23.pdf" },

    {
      regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "6th All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_SP23.pdf"
      ]
    },

    // 6th Semester Final Question
    { regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "6th Final Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_Aut21.pdf" },

    { regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "6th Final Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_Aut22.pdf" },

    { regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp23|sp 23|spring 23)\b)/i, type: "document", text: "6th Final Spring23 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_SP23.pdf" },

    {
      regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(final|finalterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "6th All Final Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_SP23.pdf"
      ]
    },

    // 6th Semester All Question
    {
      regex: /^(?=.*\b(6th|6|sixth)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "6th all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Mid_SP23.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/6th/6th_Final_SP23.pdf"
      ]
    },


    // 7th Semester Mid Question
    { regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "7th Mid Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_Aut21.pdf" },

    { regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "7th Mid Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_Aut22.pdf" },

    { regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp22|sp 22|spring 22)\b)/i, type: "document", text: "7th Mid Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_SP22.pdf" },

    {
      regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "7th All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_SP22.pdf"
      ]
    },

    // 7th Semester Final Question
    { regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "7th Final Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_Aut21.pdf" },

    { regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "7th Final Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_Aut22.pdf" },

    { regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp22|sp 22|spring 22)\b)/i, type: "document", text: "7th Final Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_SP22.pdf" },

    {
      regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(final|finalterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "7th All Final Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_SP22.pdf"
      ]
    },

    // 7th Semester All Question
    {
      regex: /^(?=.*\b(7th|7|seventh)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "7th all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/7th/7th_Final_SP22.pdf"
      ]
    },



    // 8th Semester Mid Question
    { regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "8th Mid Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_Aut21.pdf" },

    { regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "8th Mid Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_Aut22.pdf" },

    { regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(mid)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp22|sp 22|spring 22)\b)/i, type: "document", text: "8th Mid Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_SP22.pdf" },

    {
      regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(mid|midterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "8th All Mid Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_SP22.pdf"
      ]
    },

    // 8th Semester Final Question
    { regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut21|aut 21|autumn 21)\b)/i, type: "document", text: "8th Final Autumn21 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_Aut21.pdf" },

    { regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(aut22|aut 22|autumn 22)\b)/i, type: "document", text: "8th Final Autumn22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_Aut22.pdf" },

    { regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(final)\b)(?=.*\b(question|questions)\b)(?=.*\b(sp22|sp 22|spring 22)\b)/i, type: "document", text: "8th Final Spring22 Question", urls: "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_SP22.pdf" },

    {
      regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(final|finalterm)\b)(?=.*\b(question|questions)\b)/i,
      type: "document",
      text: "8th All Final Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_SP22.pdf"
      ]
    },

    // 8th Semester All Question
    {
      regex: /^(?=.*\b(8th|8|eighth)\b)(?=.*\b(question|questions)\b)(?=.*\b(prev|previous)\b)/i,
      type: "document",
      text: "8th all (Mid + Final) Previous Question",
      urls: [
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Mid_SP22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_Aut21.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_Aut22.pdf",
        "https://raw.githubusercontent.com/rakib86/IIUCbot/main/Resources/Questions/8th/8th_Final_SP22.pdf"
      ]
    },


    //Extra File outside studies
    { regex: /wordpress|theme|elementor|plugin|website/, type: "text", text: "Here is the link for WordPress elements. It includes Premium Theme, Elementor PRO, Backup Plugin, etc.\nLink: https://drive.google.com/file/d/1eitC0sr8SOkPmTzVstQ0Yp1Sy8AmPNAP" },
    { regex: /namecheap|namechep|easywp|hosting|free hosting/, type: "text", text: "Namecheap Premium Account: \n Email: neleg69265@wiemei.com\n Password: rakib1234 \nPleasn don't change password" },

    //IIUC Materials
    { regex: /pdf|doc|data/, type: "document", text: "Sample PDF", url: "https://raw.githubusercontent.com/rakib86/IIUCbot/CONNECT%202.0.pdf" },
    { regex: /facebook|fb|face/, type: "image", text: "Facebook Logo", url: "https://companieslogo.com/img/orig/FB-2d2223ad.png" },
    { regex: /video|vid|vdo/, type: "video", text: "Sample Video", url: "https://rakibpro.com/videos/The%20most%20powerful%20real-time%203D%20creation%20tool%20-%20Unreal%20Engine.mp4" },
    { regex: /cgpa|what|tell|cg|cgpa/, type: "text", text: "Hello @" + username + "! Your CGPA is " + (Math.random() * 10).toFixed(2) + " out of 4! 🤣" },

    // New intents for images and videos
    { regex: /image|pic|photo/, type: "image", text: "Sample Image", url: "https://example.com/sample-image.jpg" },
    { regex: /video|vid|vdo/, type: "video", text: "Sample Video", url: "https://example.com/sample-video.mp4" },
  ];

  // Check if the message is from a group chat
  if (chatType === "group" || chatType === "supergroup") {
    var chatId = message.chat.id;
  } else {
    // If it's a private chat, use the from ID as the chat ID
    var chatId = from;
  }

  // Check user intent and provide appropriate response
  var recognizedIntent = false; // Flag to check if any intent is recognized
  for (var i = 0; i < intents.length; i++) {
    if (intents[i].regex.test(text)) {
      recognizedIntent = true; // Set the flag to true since intent is recognized

      if (intents[i].type === "text") {
        var sendText = encodeURIComponent(intents[i].text);
        var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + chatId + "&text=" + sendText;
        var opts = { "muteHttpExceptions": true };
        UrlFetchApp.fetch(url, opts).getContentText();
      } else if (intents[i].type === "document") {
        var urls = intents[i].urls;
        if (Array.isArray(urls) && urls.length > 0) {
          // If multiple URLs are provided, send each file separately
          for (var j = 0; j < urls.length; j++) {
            var sendText = encodeURIComponent(intents[i].text);
            var sendFileUrl = encodeURIComponent(urls[j]);
            var url = apiUrl + "/sendDocument?parseMode=HTML&chat_id=" + chatId + "&caption=" + sendText + "&document=" + sendFileUrl;
            var opts = { "muteHttpExceptions": true };
            UrlFetchApp.fetch(url, opts).getContentText();
          }
        } else if (typeof urls === "string") {
          // If a single URL is provided, send it as a document
          var sendText = encodeURIComponent(intents[i].text);
          var sendFileUrl = encodeURIComponent(urls);
          var url = apiUrl + "/sendDocument?parseMode=HTML&chat_id=" + chatId + "&caption=" + sendText + "&document=" + sendFileUrl;
          var opts = { "muteHttpExceptions": true };
          UrlFetchApp.fetch(url, opts).getContentText();
        }
      } else if (intents[i].type === "image") {
        var imageUrl = intents[i].url;
        var sendText = encodeURIComponent(intents[i].text);
        var sendImage = encodeURIComponent(imageUrl);
        var url = apiUrl + "/sendPhoto?chat_id=" + chatId + "&caption=" + sendText + "&photo=" + sendImage;
        var opts = { "muteHttpExceptions": true };
        UrlFetchApp.fetch(url, opts).getContentText();
      } else if (intents[i].type === "video") {
        var videoUrl = intents[i].url;
        var sendText = encodeURIComponent(intents[i].text);
        var sendVideo = encodeURIComponent(videoUrl);
        var url = apiUrl + "/sendVideo?chat_id=" + chatId + "&caption=" + sendText + "&video=" + sendVideo;
        var opts = { "muteHttpExceptions": true };
        UrlFetchApp.fetch(url, opts).getContentText();
      }
      break; // Exit the loop since we already found a recognized intent
    }
  }

  // If no intent is recognized, the bot remains silent
  if (!recognizedIntent) {
    return;
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Method GET not allowed");
}

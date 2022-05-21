var webArtworkMods = {};

(function () {
    
    var fields = [
        {
            fieldName: "artworkId",
            prompt: "Artwork ID",
            disabled: true
        },
        {
            fieldName: "webUserId",
            prompt: "Email",
            pickList: true
        },
        {
            fieldName: "artworkImg",
            prompt: "Image URL"
        },
        {
            fieldName: "artworkName",
            prompt: "Name"
        },
        {
            fieldName: "yearCompleted",
            prompt: "Year Completed"
        },
        {
            fieldName: "type",
            prompt: "Type"
        }
       
    ];
    
    var component = document.createElement("div");

    // call reusable function to make an edit area component
    var userEditArea = MakeEditArea({
        areaTitle: "Will Get Changed...",
        fieldDefn: fields
    });
        
    component.appendChild(userEditArea);

    // This function gets a web_user record (by id) then places that data into the Edit UI. .
    webArtworkMods.update = function (webArtworkId) {
        
        console.log("update Called");

        userEditArea.areaTitle.innerHTML = "Update Artwork";
        userEditArea.blankInputs();
        userEditArea.button.innerHTML = "Update Save";
        userEditArea.formMsg.innerHTML = ""; // wipe out any old message

        console.log("webArtwork.update called with webArtworkId " + webArtworkId);

        // get the web user record with the given webUserId
        ajax("webAPIs/getOtherByIdAPI.jsp?artworkId=" + webArtworkId, gotRecordById, userEditArea.formMsg);

        // webUserObj is the output of getUserByIdAPI.jsp
        function gotRecordById(webArtworkObj) {

            userEditArea.writeDbValuesToUI(webArtworkObj);

            // get an updated list of roles (even though this does not change often), 
            // just so you see how to get a fresh role list with each web user insert.
            ajax("webAPIs/getEmailsAPI.jsp", processEmails, userEditArea.formMsg);

            // obj is the output from getRolesAPI.jsp
            function processEmails(obj) {

                if (obj.dbError.length > 0) {
                    userEditArea["webUserId"].errorTd.innerHTML += "Programmer Error: Cannot Create User Pick List";
                } else {
                    console.log(" is " + webArtworkObj.userEmail);
                    var selectTag = Utils.makePickList({
                        list: obj.emailList,
                        idProp: "webUserId",
                        displayProp: "userEmail",
                        selectedKey: webArtworkObj.userEmail  // key that is to be pre-selected (optional)
                    });

                    
                    userEditArea["webUserId"].inputTd.innerHTML = "";
                    userEditArea["webUserId"].inputTd.appendChild(selectTag);
                }
            } // processEmails
        } // gotRecordById


        userEditArea.button.onclick = function () { // Update Save

            // collect all the user input values into an object. 
            var userInputObj = userEditArea.getDataFromUI();

            // find the user role selected from the select tag (and put it into userInputObj).
            var emailSelect = userEditArea["webUserId"].inputTd.getElementsByTagName("select")[0];
            userInputObj.webUserId = emailSelect.options[emailSelect.selectedIndex].value;

            // convert userInputObj to JSON and URL encode (turns space to %20), 
            // so server does not reject URL for security reasons.
            var urlParams = encodeURIComponent(JSON.stringify(userInputObj));
            console.log("Update Save URL params: " + urlParams);

            ajax("webAPIs/updateOtherAPI.jsp?jsonData=" + urlParams, reportUpdate, userEditArea.formMsg);

            function reportUpdate(jsErrorObj) {

                userEditArea.writeErrorObjToUI(jsErrorObj);

                // jsErrorObj is a StringData object full of error messages 
                // (using same field names). 

                if (jsErrorObj.errorMsg.length === 0) { // success
                    userEditArea.formMsg.innerHTML = "Record successfully updated. ";
                } else {
                    userEditArea.formMsg.innerHTML = jsErrorObj.errorMsg;
                }
            }
        }; //updateSave submit button

        return component;

    }; // end of webArtwork.update
    
    
    
    
}());
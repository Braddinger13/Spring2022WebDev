/* global SortableTableUtils */

function liveUserContent() {

    var content = `
    
        <style>
            #userTable{
                display: flex;
                flex-direction: row;
            }
    
        </style>
            
        <div id="userReport" class="clickSort"></div>
    `;

    function deleteUser(userId, td) {

        //asking if you want to delete user
        if (confirm("Do you really want to delete user " + userId + "? ")) {
            console.log("To delete user " + userId);

            //invoking delete user API
            ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + userId, processDelete, document.getElementById("userReport"));

            function processDelete(jsErrorObj) {
                if (jsErrorObj.errorMsg.length === 0) { // success
                    alert("Record successfully deleted.");

                    // get the row of the cell that was clicked 
                    var dataRow = td.parentNode;
                    var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                    var dataTable = dataRow.parentNode;
                    dataTable.deleteRow(rowIndex);
                } else {
                    alert(jsErrorObj.errorMsg);
                }
            }

        }
    }

    var ele = document.createElement("div");
    ele.innerHTML = content;
    ajax("webAPIs/listUsersAPI.jsp", processUserData, document.getElementById("userReport"));
    function processUserData(obj) {
        if (obj.dbError.length > 0) {
            document.getElementById("userReport").innerHTML = obj.dbError;
            return;
        }

        userList = obj.webUserList;
        console.log(userList);
        var newUserObj = {};
        newUserObj.title = "Live Sortable User Table";
        newUserObj.sortIcon = "icons/sortUpDown16.png";
        newUserObj.insertIcon = "icons/insert.png";
        var newUserList = [];
        //adding each category wanted to the table
        for (var i = 0; i < userList.length; i++) {
            newUserList[i] = {};
            newUserList[i].Email = SortableTableUtils.makeText(userList[i].userEmail);
            newUserList[i]._Image = SortableTableUtils.makeImage(userList[i].image, "10rem");
            newUserList[i].Birthday = SortableTableUtils.makeDate(userList[i].birthday);
            newUserList[i].Role = SortableTableUtils.makeText(userList[i].userRoleId + " " + userList[i].userRoleType);
            newUserList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />", // innerHTML of link
                    '#/userUpdate/' + userList[i].webUserId             // href of link
                    );
            newUserList[i]._Delete = SortableTableUtils.makeImage("icons/delete.png", "1rem");

            const userId = obj.webUserList[i].webUserId;
            newUserList[i]._Delete.onclick = function () {
                deleteUser(userId, this);
            };

        }

        newUserObj.objList = newUserList;
        document.getElementById("userReport").appendChild(MakeClickSortTable(newUserObj));
    }

    return ele;
}

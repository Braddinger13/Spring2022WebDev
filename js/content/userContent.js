/* global SortableTableUtils */

function userContent() {
        
    var content = `
    
        <style>
            #userTable{
                display: flex;
                flex-direction: row;
            }
    
        </style>
            
        <div id="userReport" class="clickSort"></div>
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    
    ajax("json/users.json", processUserData, document.getElementById("userReport"));
    
    function processUserData(userList){
        console.log(userList);
        
        var newUserObj = {};
        newUserObj.title = "Sortable User Table";
        newUserObj.sortIcon = "icons/sortUpDown16.png";
        
        var newUserList = [];
        
        //adding each category wanted to the table
        for (var i=0; i < userList.length; i++){
            newUserList[i] = {};
            
            newUserList[i].Email = SortableTableUtils.makeText(userList[i].userEmail);
            newUserList[i]._Image = SortableTableUtils.makeImage(userList[i].image, "10rem");
            newUserList[i].Birthday = SortableTableUtils.makeDate(userList[i].birthday);
            newUserList[i].Role = SortableTableUtils.makeText(userList[i].userRoleId + " " + userList[i].userRoleType);       
        }
        
        newUserObj.objList = newUserList;
        document.getElementById("userReport").appendChild(MakeClickSortTable(newUserObj));
    } 
    
    return ele;
}



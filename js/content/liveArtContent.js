/* global SortableTableUtils */

function liveArtContent() {

    var content = `
        
        <style>
            #userTable{
                display: flex;
                flex-direction: row;
            }
    
        </style>
            
        <div id="artReport" class="clickSort"></div>
    `;

    function deleteArt(artId, td) {

        //asking if you want to delete user
        if (confirm("Do you really want to delete artwork " + artId + "? ")) {
            console.log("To delete artwork " + artId);

            //invoking delete user API
            ajax("webAPIs/deleteOtherAPI.jsp?deleteId=" + artId, processDelete, document.getElementById("artReport"));

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

    ajax("webAPIs/listOtherAPI.jsp", processArtData, document.getElementById('artReport'));

    function processArtData(obj) {
        if (obj.dbError.length > 0) {
            document.getElementById("artReport").innerHTML = obj.dbError;
            return;
        }

        artList = obj.artworkList;

        console.log(artList);

        var newArtObj = {};

        newArtObj.title = "Live Sortable Art Table";
        newArtObj.icon = "icons/sortUpDown16.png";

        var newArtList = [];

        //adding each category wanted from json data to the table
        for (var i = 0; i < artList.length; i++) {
            newArtList[i] = {};

            newArtList[i].Email = SortableTableUtils.makeText(artList[i].userEmail);
            newArtList[i]._Image = SortableTableUtils.makeImage(artList[i].artworkImg, "10rem");
            newArtList[i].Name = SortableTableUtils.makeText(artList[i].artworkName);
            newArtList[i].Year_Completed = SortableTableUtils.makeNumber(artList[i].yearCompleted, false);
            newArtList[i].Type = SortableTableUtils.makeText(artList[i].type);
            newArtList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />", // innerHTML of link
                    '#/artworkUpdate/' + artList[i].artworkId    // href of link
                    );
            newArtList[i]._Delete = SortableTableUtils.makeImage("icons/delete.png", "1rem");

            const artId = obj.artworkList[i].artworkId;
            newArtList[i]._Delete.onclick = function () {
                deleteArt(artId, this);
            };
        }

        newArtObj.objList = newArtList;
        document.getElementById("artReport").appendChild(MakeClickSortTable(newArtObj));
    }

    return ele;
}



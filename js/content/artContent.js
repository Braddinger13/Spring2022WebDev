/* global SortableTableUtils */

function artContent() {

    var content = `
        
        <style>
            #userTable{
                display: flex;
                flex-direction: row;
            }
    
        </style>
            
        <div id="artReport" class="clickSort"></div>
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;
    
    ajax("json/artwork.json", processArtData, document.getElementById('artReport'));
    
    function processArtData(artList){
        console.log(artList);
        
        var newArtObj = {};
        
        newArtObj.title = "Sortable Art Table";
        newArtObj.icon = "icons/sortUpDown16.png";
        
        var newArtList = [];
        
        //adding each category wanted from json data to the table
        for(var i=0; i < artList.length; i++){
            newArtList[i] = {};
            
            newArtList[i].Email = SortableTableUtils.makeText(artList[i].userEmail);
            newArtList[i]._Image = SortableTableUtils.makeImage(artList[i].image, "10rem");
            newArtList[i].Name = SortableTableUtils.makeText(artList[i].artworkName);
            newArtList[i].Year_Completed = SortableTableUtils.makeNumber(artList[i].yearCompleted, false);
            newArtList[i].Type = SortableTableUtils.makeText(artList[i].type);            
            
        }    
        newArtObj.objList = newArtList;
        document.getElementById("artReport").appendChild(MakeClickSortTable(newArtObj));
    }

    return ele;
}


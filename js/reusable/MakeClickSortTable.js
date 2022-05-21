function MakeClickSortTable(params) {

    var title = params.title || "Object Table";
    var objList = params.objList;
    var sortIcon = params.sortIcon || "icons/sortUpDown16.png";
    var firstSort = params.firstSort || "Email";
    var insertIcon = params.insertIcon || "";

    // Return true if any property of obj contains searchKey. Otherwise, return false.
    function isToShow(obj, searchKey) {

        // show the object if searchKey is empty
        if (!searchKey || searchKey.length === 0) {
            return true;
        }

        // convert search key to upper case (will convert values also to upper case before comparing).
        var searchKeyUpper = searchKey.toUpperCase();

        for (var prop in obj) {

            // Do not try to find a match for Table cells that hold images. 
            if (prop[0] !== "_") {

                // pull out the innerHTML because all properties of obj are actually <td> tags, not just text.
                var propVal = obj[prop].innerHTML; // associative array, using property name as if index. 
                var propValUpper = propVal.toUpperCase(); // convert to upper case to match searchKey.

                console.log("checking if " + searchKeyUpper + " is in " + propValUpper);

                if (propValUpper.includes(searchKeyUpper)) {
                    console.log("Yes it is inside");
                    return true;
                }
            } // excluding image tds
        }
        console.log("no it is not inside");
        return false;
    } // isToShow 


    //function for sorting and sorting in reverse
    function jsSort(objList, firstSort, order) {
        if (!objList || !objList[0]) {
            var message = "Cannot sort. Need an objList with at least one object";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        var obj = objList[0];
        if (!obj[firstSort]) {
            var message = "objList does not have property " + firstSort + " -- cannot sort by that property.";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        if (!obj[firstSort].sortOrder || obj[firstSort].sortOrder === null) {
            var message = "Cannot sort objList by property " + firstSort +
                    " because this property never had it's sortOrder set (by a method in SortableTableUtils.js).";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        // q and z are just elements in the array and the function has to return negative or positive or zero 
        // depending on the comparison of q and z.
        // using JS associative array notation (property name char string used inside square brackets 
        // as it if was an index value). 

        objList.sort(function (q, z) {  // in line (and anonymous) def'n of fn to compare list elements. 
            // the function you create is supposed to return positive (if first bigger), 0 if equal, negative otherwise.
            // using JS associative array notation, extract the 'byProperty' property from the two
            // list elements so you can compare them.
            var qVal = q[firstSort].sortOrder;
            var zVal = z[firstSort].sortOrder;


            var c = 0;
            if (qVal > zVal) {
                if (order === true) {
                    c = 1;
                } else {
                    c = -1;
                }

            } else if (qVal < zVal) {
                if (order === true) {
                    c = -1;
                } else {
                    c = 1;
                }
            }
            console.log("comparing " + qVal + " to " + zVal + " is " + c);
            return c;
        });
    }

    //makes body of table, initially and when changed
    function addTableBody(table, objList, firstSort, order) {
        // remove old tbody element if there is one (else you'll get the new sorted rows 
        // added to end of what's there).
        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        jsSort(objList, firstSort, order);

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);

        // To the tbody, add one row (to HTML table) per object in the object list.
        // To each row, add a td element (Table Data, a cell) that holds the object's 
        // property values. 
        for (var i in objList) {
            var tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);

            // create one table data <td> content matching the property name
            var obj = objList[i];
            for (var prop in obj) {

                // obj[prop] should already hold a "td" tag
                tableRow.appendChild(obj[prop]);
            }
        }
    }

    function filterTableBody(table, objList, filterValue) {
        // remove old tbody element if there is one (else you'll get the new sorted rows 
        // added to end of what's there).
        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);

        // To the tbody, add one row (to HTML table) per object in the object list.
        // To each row, add a td element (Table Data, a cell) that holds the object's 
        // property values. 
        for (var i in objList) {
            if (isToShow(objList[i], filterValue)) {
                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                // create one table data <td> content matching the property name
                var obj = objList[i];
                for (var prop in obj) {

                    // obj[prop] should already hold a "td" tag
                    tableRow.appendChild(obj[prop]);
                }
            }
        }
    }


    function makeHeader(propName, sortIcon) {
        //creates a table header element
        var headingCell = document.createElement("th");
        var order = true;

        //replaced underscores with spaces when displaying property names
        var headingText = propName.replace("_", " ");

        //if property starts with and underscore, we assume it's not sortable (image)
        if (propName[0] !== "_") {
            headingText = "<img src='" + sortIcon + "'/>" + headingText;

            headingCell.onclick = function () {
                console.log("Sorting on property: " + propName);
                addTableBody(newTable, objList, propName, order);
                filterTableBody(newTable, objList, filterInput.value);

                if (order === true) {
                    order = false;
                    console.log("Sort reversed");
                } else {
                    order = true;
                    console.log("Sort in order");
                }
            };
        }
        headingCell.innerHTML = headingText;
        return headingCell;
    }

    //full object being returned
    var container = document.createElement("div");

    //Creates table heading and appends to container
    var heading = document.createElement("h2");
    heading.innerHTML = title;
    container.appendChild(heading);

    if (insertIcon.length > 0) {
        //insert logo
        var insert = document.createElement("div");
        insert.innerHTML = "<a href='#/userInsert'><img src='" + insertIcon + "' style='width:1.5rem' /></a>";
        container.appendChild(insert);
        insert.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/userInsert";
        };

    }
    //Search box for filtering
    var filter = document.createElement("div");
    container.appendChild(filter);
    filter.innerHTML = "Filter by: ";

    var filterInput = document.createElement("input");
    filter.appendChild(filterInput);

    //creates new table tag
    var newTable = document.createElement("table");
    container.appendChild(newTable);

    //creates table's header row and appends to the table DOM
    var headerRow = document.createElement("tr");
    newTable.appendChild(headerRow);

    //create a header for each property
    var obj = objList[0];
    for (var propName in obj) {
        headerRow.appendChild(makeHeader(propName, sortIcon));

    }



    //shows all table values initially
    addTableBody(newTable, objList, firstSort, true);
    console.log("initial table added");
    console.log("Sort in order");

    filterInput.onkeyup = function () {
        console.log("Search filter input changed to " + filterInput.value);
        filterTableBody(newTable, objList, filterInput.value);
    };

    return container;

}

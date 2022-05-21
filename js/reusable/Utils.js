var Utils = {};


// Utils.make: using document.createElement(), create a DOM element with HTML tag name params.htmlTag (required property).
// Optional property: params.innerHTML. Set the newly created element's innerHTML to this (if provided).
// Optional property: params.class. Set the newly created DOM element to the class (if provided). 
// Optional property: params.parent. Append the newly created element to this parent DOM element (if provided).
Utils.make = function (params) {
    if (!params.htmlTag) {
        throw new Error("Utils.make function requires parameter object with htmlTag property.");
        return; // should not really need this, just being cautious
    }

    var ele = document.createElement(params.htmlTag);

    if (params.innerHTML) {
        ele.innerHTML = params.innerHTML;
    }

    if (params.class) {
        ele.classList.add(params.class);
    }

    if (params.parent) {
        params.parent.appendChild(ele);
    }

    return ele;
};

// Utils.makePickList - makes a select tag from a list of objects. 
// INPUTS:
// params.list (req'd): the JS array of objects that holds the name/value pairs for the pick list
// params.displayProp (used to be params.valueProp) field that holds what will show in the pick list. 
// params.idProp (used to be params.keyProp) field that holds the value of the selectTag 
//    once the user clicks on one of the visible options. 
// params.selectedKey (optional): id (key) of the option of the picklist to pre-select.

Utils.makePickList = function (params) {

    // for backward compatibility (changing confusing names of parameter properties).
    if (!params.displayProp) {
        params.displayProp = params.valueProp;
    }

    if (!params.idProp) {
        params.idProp = params.keyProp;
    }

    var selectList = document.createElement("select");

    // check that we have the parameter properties that we need.
    if (!params.list || !params.list[0] || !params.displayProp || !params.idProp) {
        alert("Utils.makePickList function requires a parameter object with these properties: \n" +
                "list: array of objects that hold the key/value pairs from which to populate the select tag,\n" +
                "displayProp (changed from valueProp): name of property (in array of objects) to show in the pick list,\n" +
                "idProp (changed from keyProp): name of property that holds ids (value of select tag after user clicks an option).\n" +
                "selectedKey (optional): key that should be pre-selected in the pick list in the UI.");
        return selectList; // empty select list
    }

    // add options to the select list
    for (var i in params.list) { // i goes from 0 to the last element in array list

        var myOption = document.createElement("option");
        myOption.innerHTML = params.list[i][params.displayProp]; // what shows in the select tag
        myOption.value = params.list[i][params.idProp]; // the value behind each item shown in the select tag.
        selectList.appendChild(myOption);

        if (params.selectedKey && selectList.options[i].value === params.selectedKey) {
            selectList.selectedIndex = i;
        }

        // add option into the select list
        selectList.appendChild(myOption);
    }

    return selectList;

};

// referenece about select tags: 
// https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_select
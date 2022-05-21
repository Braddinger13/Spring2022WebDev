function MakeArtwork(params) {

    var artworkObj = document.createElement("div");
    artworkObj.classList.add("artwork"); //Adds styling to ele, artwork.css

    //public property myType for type of artwork and price estimation
    artworkObj.myType = params.type;
    artworkObj.myPrice = params.price;

    //private properties myImg, myName, and myDesc
    var myImg = document.createElement("img");
    myImg.src = params.img;
    artworkObj.appendChild(myImg);

    var artworkInfo = document.createElement("div");
    artworkObj.appendChild(artworkInfo);

    var myName = params.name;
    var myDesc = params.desc || "One of a kind!"; // optional property, will default to the latter argument

    function display() { //Private function for displaying object properties
        artworkInfo.innerHTML = "<h3>" + myName + "</h3>" +
                "<p>Type: " + artworkObj.myType +
                "</br>Price: $" + artworkObj.myPrice +
                "</br>Description: " + myDesc + "</p>";
    }
    ;

    //public setter functions
    artworkObj.changeType = function (newType) {
        artworkObj.myType = newType;
        console.log("Changed artwork type to" + newType);
        display();
    };

    //adds/subtracts value passed to update the price
    artworkObj.addToPrice = function (userPrice) {
        var n = Number(userPrice);
        if (isNaN(n)) {
            console.log("Not a valid number");
            n = 0;
        }
        console.log("Price changed by " + n);
        artworkObj.myPrice += n;
        display();
    };

    artworkObj.changeName = function (newName) {
        myName = newName;
        console.log("Name changed to " + newName);
        display();
    };

    artworkObj.changeDesc = function (newDesc) {
        myDesc = newDesc;
        console.log("Description changed to " + newDesc);
        display();
    };

    //Creating UI for changing artwork properties
    var nameButton = document.createElement("button");
    nameButton.innerHTML = "Change artwork name to: ";
    artworkObj.appendChild(nameButton);

    var nameInput = document.createElement("input");
    artworkObj.appendChild(nameInput);

    nameButton.onclick = function () {
        artworkObj.changeName(nameInput.value);
    };

    var typeButton = document.createElement("button");
    typeButton.innerHTML = "Change artwork type to: ";
    artworkObj.appendChild(typeButton);

    var typeInput = document.createElement("input");
    artworkObj.appendChild(typeInput);

    typeButton.onclick = function () {
        artworkObj.changeType(typeInput.value);
    };

    var priceButton = document.createElement("button");
    priceButton.innerHTML = "Add amount to price: ";
    artworkObj.appendChild(priceButton);

    var priceInput = document.createElement("input");
    artworkObj.appendChild(priceInput);

    priceButton.onclick = function () {
        artworkObj.addToPrice(priceInput.value);
    };


    var descButton = document.createElement("button");
    descButton.innerHTML = "Change description to: ";
    artworkObj.appendChild(descButton);

    var descInput = document.createElement("input");
    artworkObj.appendChild(descInput);

    descButton.onclick = function () {
        artworkObj.changeDesc(descInput.value);
    };

    //display initial function call
    display();

    return artworkObj;
}


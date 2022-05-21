function MakeFlippingGallery(params) {

    var title = params.title || "Gallery";
    var artList = params.artList || [];

    var galleryObj = document.createElement("div"); //object being returned
    galleryObj.classList.add('flippingGallery'); //adding styling to the object returned

    var titleHead = document.createElement("h3");
    galleryObj.appendChild(titleHead);

    var buttonDiv = document.createElement('div');
    galleryObj.appendChild(buttonDiv);

    var cardsDiv = document.createElement('div');

    var k = 0;
    var speed = 100;
    typeWriter();
    //function for creating the typewrite title of the gallery
    function typeWriter() {
        if (k < title.length) {
            titleHead.innerHTML += title.charAt(k);
            k++;
            setTimeout(typeWriter, speed);
        }
    }
    ;

    var allButton = document.createElement('button');
    allButton.innerHTML = "Show all";
    allButton.classList.add("btn", "active");
    buttonDiv.appendChild(allButton);

    var objButtons = [];
    
    objButtons.push(allButton);
    
    allButton.onclick = function(){
        filterSelection('all');
        console.log('Showing all for ' + title);
    };
    
    //Should be appended before the cards
    function makeButtons(obj) {
        //pasrsing list and separates by filter
        var tags = obj.tags || "";
        var buttons = tags.split(" ");

        console.log(buttons);

        //loops through tags and makes sure not to repeat any tags for buttons
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i] !== "" && !objButtons.includes(buttons[i])){
                objButtons.push(buttons[i]);
                let button = document.createElement('button');
                button.classList.add('btn');
                button.innerHTML = buttons[i];
                buttonDiv.appendChild(button);
                
                button.onclick = function(){
                    filterSelection(button.innerHTML);
                    console.log('Showing ' + button.innerHTML + " for " + title);
                };
            }
        }
    }
    ;

    for (var i = 0; i < artList.length; i++) {
        makeButtons(artList[i]);
    }

    //This function creates a div that holds child divs, it represents a "card" that can be flipped.
    //obj being passed in is artList, the list of cards with the needed information to create them.
    function makeCard(obj) {
        

        //Creates div with filtering classes based on tags, append to div being returned
        var filterDiv = document.createElement("div");
        
        var tags = obj.tags || "";
        var classes = tags.split(" ");
        filterDiv.classList.add("filterDiv");
        
        for(var i=0; i<classes.length; i++){
            if(classes[i] !== ""){
                filterDiv.classList.add(classes[i]);
            }
        }
        
        cardsDiv.appendChild(filterDiv);

        //Creates div that holds two child divs, cardFront and cardBack
        var cardInnerDiv = document.createElement("div");
        cardInnerDiv.classList.add('cardInner');
        filterDiv.appendChild(cardInnerDiv);

        //cardFront will be the front facing side displayed with no action
        var cardFrontDiv = document.createElement("div");
        cardFrontDiv.classList.add('cardFront');
        cardFrontDiv.innerHTML = "<img src='" + obj.image + "'>";
        cardInnerDiv.appendChild(cardFrontDiv);


        //cardBack will be displayed when being hovered over
        var cardBackDiv = document.createElement("div");
        cardBackDiv.classList.add('cardBack');
        cardBackDiv.innerHTML = "<h4>" + obj.name + "</h4>";
        cardInnerDiv.appendChild(cardBackDiv);

    }
    ;

    //looping through artList and creating cards
    for (var i = 0; i < artList.length; i++) {
        makeCard(artList[i]);
    }

    galleryObj.appendChild(cardsDiv);

    filterSelection("all");
    //function invoked when clicking on a filter button
    function filterSelection(c) {
        var x;
        x = galleryObj.getElementsByClassName("filterDiv");
        console.log(x);
        if (c === "all") {
            c = "";
        }

        for (var i = 0; i < x.length; i++) {
            removeClass(x[i], "show");
            console.log(x[i]);
            if (x[i].className.indexOf(c) > -1) {
                addClass(x[i], "show");
            }
        }

    }
    ;

    function addClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            if (arr1.indexOf(arr2[i]) === -1) {
                element.className += " " + arr2[i];
            }
        }
    }
    ;

    function removeClass(element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
    }
    ;

    return galleryObj;
}
function artworkContent() {

    var content = `
        <style>
            .flexContainer{
                display: flex;
                flex-direction: row;
                
            }
    
            .flexContainer .artwork{
                width: 33%;
                box-sizing: border-box;
                border-style: solid none solid none;
                border-radius: .75rem;
            }
    
            h2{
                text-align: center;
            }
        </style>

        <h2>Your Gallery</h2>
    
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;
    var artworkContainer = document.createElement("div");

    artworkContainer.classList.add("flexContainer");
    //add div for holding ojects
    ele.appendChild(artworkContainer);

    //creating the objects using MakeArtwork.js
    artworkContainer.appendChild(MakeArtwork({type: "Painting", price: 1000, img: "pics/starryNight.jpg", name: "Starry Night"}));
    artworkContainer.appendChild(MakeArtwork({type: "Statue", price: 100000, img: "pics/love-sculpture.jpg", name: "Love Statue", desc: "Located in Love Park"}));
    artworkContainer.appendChild(MakeArtwork({type: "Drawling", price: 20, img: "pics/day-and-night.jpg", name: "Day and Night", desc: "Day and Night by MC Escher"}));
    return ele;
}
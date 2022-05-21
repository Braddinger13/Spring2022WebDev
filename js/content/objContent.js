function objContent() {

var content = `
        <style>
            p {
                margin-left: 1.5rem;
            }
            .flexContainer {
                display:flex; 
                flex-direction: row;
                background-color: grey;
                margin-bottom: 1.5rem;
            }
            .flexContainer .obj {
                width: 33%; /* to fit three columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
            }
        </style>
        <h3>This Function Generates Content Using More JS</h3>
        <p>
            In this JS function, several objects are created and then appended into the 
            content area. 
        </p>
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content; // the HTML code specified just above...
        var objContainer = document.createElement("div");
        objContainer.classList.add('flexContainer'); // see styling in this file, above...
        ele.appendChild(objContainer);
        objContainer.appendChild(MakeObj("Nevada", "http://cis-linux2.temple.edu/~sallyk/pics_sk/balloons.png", "$695 for 3 days/nights"));
        objContainer.appendChild(MakeObj("Japan", "http://cis-linux2.temple.edu/~sallyk/pics_sk/japan.png", "$2400 for 6 days/nights"));
        objContainer.appendChild(MakeObj("Sydney", "http://cis-linux2.temple.edu/~sallyk/pics_sk/sydney.png", "$5900 for 9 days/nights"));

        return ele;
}
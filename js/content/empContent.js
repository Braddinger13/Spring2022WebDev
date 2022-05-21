function empContent() {

    var content = `
    <style>
        p {
            margin-left: 1.5rem;
        }
    
        .flexContainer {
            display: flex;
            flex-direction: row;
            background-color: grey;
            margin-bottom: 1.5rem;
        }
        .flexContainer .emp {
                width: 50%; /* to fit two columns inside the flexContainer */
                box-sizing: border-box; /* makes padding and border counted in the width */
        }
    </style>
    
        <h2>Employees</h2>
    `;
    var ele = document.createElement("div");
    //puts the HTML content in the newly created div
    ele.innerHTML = content;

    var empContainer = document.createElement("div");
    empContainer.classList.add('flexContainer');
    ele.appendChild(empContainer);

    //Calls MakeObj to fill in container
    empContainer.appendChild(MakeEmp("http://cis-linux2.temple.edu/~sallyk/pics_users/pei.jpg", "Pei", "Professor/Researcher"));
    empContainer.appendChild(MakeEmp("http://cis-linux2.temple.edu/~sallyk/pics_users/jamie.jpg", "Jamie", "Professor/Researcher"));

    return ele;
}


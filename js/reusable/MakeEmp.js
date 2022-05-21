function MakeEmp(imgFile, name, title) {

    //Creates div for an object
    var ele = document.createElement("div");
    ele.classList.add("emp");

    //Creates img tag for picture
    var myImgFile = document.createElement("img");
    myImgFile.src = imgFile;
    ele.appendChild(myImgFile);

    //Creates h3 tag for name
    var myName = document.createElement("h3");
    myName.innerHTML = name;
    ele.appendChild(myName);

    //Creates h4 tag for title
    var myTitle = document.createElement("h4");
    myTitle.innerHTML = title;
    ele.appendChild(myTitle);

    return ele;
}


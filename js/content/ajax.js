function ajax(url, successCallBackFn, errorEle) {

    // This httpReq Object is now local to function "ajaxCall" (not global)
    // AND we get a new object each time we invoke the ajax function.
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest(); //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP"); //For IE 5+
    } else {
        alert('ajax not supported');
    }

    console.log("ready to get content " + url);
    httpReq.open("GET", url); // specify which page you want to get

    // We now define the function that the browser will "call back" when the data is available.
    // We do not bother naming the function. It's defined anonymously, in line. 

    httpReq.onreadystatechange = function () {
        //console.log("in ajax, ready state is " + httpReq.readyState);

        if (httpReq.readyState === 4) {     // 4 means that the data transfer is complete
            console.log("in ajax, status is " + httpReq.status);
            
            if (httpReq.status === 200) {   // 200 means file found (unlike 404 which means not found)
                console.log("in ajax, js object printed next");
                
                var obj = JSON.parse(httpReq.responseText);
                console.log(obj);

                // Here we call back whichever function wanted us to make the AJAX call. 
                // Let that function handle the details of what to do with the data, how to parse it... 
                // The responseText property holds the data. This code assumes the data returned is 
                // in JSON format, so it converts this to a JavaScript object, passing that to 
                // the function that is to handle the data returned by the AJAX call. 
                successCallBackFn(obj);

            } else {  // error, file not found

                // One input parameter to this ajax function is a DOM element designed to hold any possible error message. 
                // Populate it with as much information as we know about the error. 
                errorEle.innerHTML = "Error " + httpReq.status + "-" + httpReq.statusText +
                        " while attempting to read '" + url + "'. Must Run not View if AJAX being used.";
            }
        }
    }; // end of anonymous callback function definition

    httpReq.send(null); // initiate ajax call
    console.log("call initiated");

    // Now this function is done running, but whenever the data is ready, 
    // the anonymous call back function will be invoked.

} // end function ajax


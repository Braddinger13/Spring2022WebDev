
var account = {};

(function () {

    account.login = function () {

        var logDiv = document.createElement("div");
        logDiv.classList.add("account");


        //email UI
        var emailHead = document.createElement("div");
        emailHead.innerHTML = "Email Adress";
        logDiv.appendChild(emailHead);

        var emailInput = document.createElement("input");
        logDiv.appendChild(emailInput);


        //password UI
        var passHead = document.createElement("div");
        passHead.innerHTML = "Password";
        logDiv.appendChild(passHead);

        var passInput = document.createElement("input");
        passInput.setAttribute("type", "password");
        logDiv.appendChild(passInput);


        //submit UI
        var submitButton = document.createElement("button");
        submitButton.innerHTML = "Submit";
        logDiv.appendChild(submitButton);

        var ele = document.createElement("div");

        //for clicking the submit button
        submitButton.onclick = function () {

            //creates the necessary String for obtaining data passed into the email and password input boxes
            var call = "webAPIs/logonAPI.jsp?userEmail=" + emailInput.value + "&userPassword=" + passInput.value;

            ajax(call, processLogin, ele);

            function processLogin(obj) {
                var msg = buildProfile(obj);

                ele.innerHTML = msg;
                logDiv.appendChild(ele);

            }
            ;

        };

        return logDiv;
    };

    function buildProfile(userObj) {
        var msg = "";

        if (userObj.errorMsg.length > 0) {
            msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
        } else {
            msg += "<p><strong>Welcome Web User " + userObj.webUserId + "</strong>";
            msg += "</br>Birthday: " + userObj.birthday;
            msg += "</br>Membership Fee: " + userObj.membershipFee;
            msg += "</br>User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "</br><img src='" + userObj.image + "'></p>";
        }
        return msg;
    }
    ;

    account.getProfile = function () {

        var profile = document.createElement("div");
        profile.classList.add("account");

        var ele = document.createElement("div");

        ajax("webAPIs/getProfileAPI.jsp", processProfile, profile);

        function processProfile(obj) {
            var msg = buildProfile(obj);
            ele.innerHTML = msg;

            profile.appendChild(ele);
        }

        return profile;

    };

    account.logoff = function () {

        var logoffMsg = document.createElement("div");

        ajax("webAPIs/logoffAPI.jsp", processLogoff, logoffMsg);

        var ele = document.createElement("div");

        function processLogoff(obj) {

            ele.innerHTML = obj.errorMsg;

            logoffMsg.appendChild(ele);
        }

        return logoffMsg;
    };

}());


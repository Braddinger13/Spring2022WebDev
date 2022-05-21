function blogContent() {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
var content = ` 
      <h5>Artwork table:</h5>

            <ul>
                <li>Auto-increment private key</li>
                <li>Name of artwork</li>
                <li>Image URL</li>

                <!--The user optional non-character fields-->
                <li>Year Completed (optional)</li>
                <li>Artwork width (optional)</li>
                <li>Artwork height (optional)</li>

                <li>Artwork description (optional) </li>
                <li>Type of artwork</li>
                <li>Foreign key to user-table</li>
            </ul>

            <p>
                All of my web development/design experience comes from out of out of class projects.
                I first started learning CSS and HTML when I made a personal web site, which made for
                a good learning experience. I also have some experience in web APIs. I used the Spotify API
                to create a project using python. Other then these projects, I don't have much experience in
                the topic.
            </p>
    
            <h5>Home Page HW</h5>
            <p>
                I think the part of this homework I found easiest was the styling. I thought I kind of already
                knew what I wanted to do with it style wise, I just had to find the correct pictures and edit them.
                The hardest part for me was structuring everything so it looked organized.
                A valuable skill I learned was making the media query so my site can look nice in both mobile and desktop
                layouts.
            </p>
            
            <h5>JavaScript UI HW</h5>
            <p>
                Something I found easy in this homework was changing the Nav Bar and messing with it's CSS to obtain
                the look and feel that I desired. The hard part of this assignment was understanding the nav router code.
                Since this is my first time working with JavaScript, some terms and methods thre me a little bit.
                I also found this to be the valuable aspect of this assignment, since it made us really look and try to
                understand what is really happening, as well as building upon it.
            </p>
    
            <h5>JavaScript Object HW</h5>
            <p>
                The easy part of this weeks homework for me was the Object Oriented programming aspect, probably because
                this was a concept I have been used to. The hard part for me was keeping track of each div and the class
                lists because I have little practice with this and it messed up my styling for a little. A valuable aspect
                of this homework was creating the user interface that could change the site using buttons and input.
            </p>
    
            <h5>Database HW</h5>
            <p>
                Previous to this class I had no database experience
            </p>
            <p>
                Something I found easy about this homework, as well as databases was learning to use the ide as well as
                learning the SQL keywords. The part that I found the hardest was getting used to referencing different
                tables using keys. I also found this the most valuable part, being able to relate tables to eachother.
                Click <a target="_blank" href='Dinger_DataBase.pdf'>here</a> to see my database document.
            </p>
    
            <h5>ClickSort HW</h5>
            <p>
                This week we had to implement a function that creates tables that are both
                "Click Sotrable" as well as filerable. The data for these tables are passed in through
                json files and read with AJAX. Something I found easy about this homework was displaying the
                initial data on the table, from the json file. Something that was hard, and initially confusing, 
                was blending the filter and the clicksort compenents together. An important concept was using
                sort and reversing the sort.
            </p>
    
            <h5>Tutorial Proposal</h5>
            <p>
                This week we had to type out proposal for our tutorial project, as well as developing a proof of
                concept html file. Something that I found easy with this was visualizing what I wanted to do with my components.
                An aspect of this propsal that was challenging
                was combining my three components together into one. I think the fact that this homework is so self-driven
                is the most valuable part.
            <p>
    
            <h5>Web API HW</h5>
            <p>
                Prior to this assignment, I had no experience writing any server side code.
                Some important concepts we learned this week were commmunicating with the server and 
                learning how to debug server side code. The easy part of this weeks homework was plugging
                in the web API to the reusable javascript components. The hard part was laerning all of the
                new vocab and terms that were introduced this week. 
                <ul>
                    <li>Click <a target="_blank" href="WebApiErrors.pdf">here</a> to see my error document.</li>
                    <li>Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> to see my list users API</li>
                    <li>Click <a target="_blank" href="webAPIs/listOtherAPI.jsp">here</a> to see my list art API</li>
                </ul>
            </p>
    
            <h5>Logon HW</h5>
            <p>
                Something that I found challenging in this week's homework was getting the User interface up to full
                functionality. An easy part of this homework was using the api calls and session objects, as we had 
                some practice with these in the previous weeks. An important part of this homework was learning to
                mix the api functionality with the user interface.
                <ul>
                    <li>Click <a target="_blank" href="webAPIs/logonAPI.jsp?userEmail=tuk81273@temple.edu&userPassword=pass">here</a>
                        for logon - complete with valid URL parameters for a successful logon.
                    </li>
                    <li>Click <a target="_blank" href="webAPIs/logoffAPI.jsp">here</a> for a successful logoff</li>
                    <li>Click <a target="_blank" href="webAPIs/getProfileAPI.jsp">here</a> to get current profile</li>
                    <li>Click <a target="_blank" href="webAPIs/listUsersAPI.jsp">here</a> for a list of all web Users</li>
                </ul>
            </p>
    
            <h5>Tutorial</h5>
            <p>
                For this tutorial, the most challenging aspect was taking my proof of concept hard-coded example,
                and turning it into a completely reusable component, however this was also a very valuable experience.
                Something I found easy was thinking of what outcome I wanted in my javascript, then applying it, such
                as looping through the objects that I passed into the functions. I think the most valuable aspect of
                this assignment was the ability to start something by ourselves.
            </p>
    
            <h5>Update HW</h5>
            <p>
                For the update homework, I found keeping track of all the different files and api calls the most challenging.
                Something I found easy was getting the update and getOtherByID api's to function properly. The most valuable 
                part of this assignment was incorporating many things we have learned this year as well as being able to dynamically
                update a web app.
            </p>
    
            <h5>Delete HW</h5>
            <p>
                I think the most challenging part of this week was writing the delete function in dbMods. An east aspect of this week was
                adding the delete column to the UI, as we already did something like this in the previous Update homework. An important part
                of this homework was getting more confortable working with API's and user events.
            </p>
    
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
}
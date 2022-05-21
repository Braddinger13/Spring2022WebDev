function homeContent() {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 


var content = `
    
        <style>
            .mainText{
                text-align: center;
                display: flex;
                flex-direction: column;
            }
    
            #rightText{
                background-color: #A7B5D1;
                border-radius: .25rem;
                width: 45%;
                margin: 1rem;
                margin-bottom: 5rem;
                padding: 0.5rem;
            }
    
            #leftText{
                background-color: #A7B5D1;
                border-radius: .25rem;
                width: 45%;
                margin: 1rem;
                margin-top: 5rem;
                padding: 0.5rem;
            }
    
            @media only screen and (min-width: 40rem) {
                .mainText{
                    flex-direction: row;
                }
            }
            
        </style>

        <h2>Online Art Portfolios</h2>

        <div class="mainText">
            <p id="rightText"> 
                Have any underappreciated pieces of art?
                This site is made for artists who deserve more recognition!
                Artists can display their fantastic work for everyone to see by simply uploading the pictures
                they want to display. Sign up to discover other aspiring artists and post your own personal
                collection.
            </p>

            <p id="leftText">
                Users are not limited to any certain form of art! Photographers, Graphic Designers, Interior Decorators, and
                any other form of visual artist are all welcome! Click <a href='https://www.skillshare.com/blog/top-4-benefits-of-creating-an-online-design-portfolio/' target='_blank'>here</a> to see some benefits of having your
                own online portfolio.
            </p>
        </div>
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
        }
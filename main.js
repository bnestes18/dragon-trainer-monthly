// VARIABLES
let app = document.getElementById('app');


// FUNCTIONS

// This function renders an error message if no data is displayed on the page
function renderFail() {
    app.innerHTML = `<p>Uh-oh...the articles have went up in flames! Unable to display any data at this time.</p>`
}

// This function returns the data from the dragons api
async function getData() {
    try {
        // Fetch a response from the api
        let response = await fetch('https://vanillajsacademy.com/api/dragons.json');
        // If the response is not okay (anything other than code 200), then throw an error code
        if (!response.ok) {
            throw response.status;
        }

        // Otherwise, convert the response data into JSON format
        let data = await response.json();
        return data;
        } catch (error) {
            console.warn(error);
            renderFail();
        }
        
}

// This functon displays each article from the data obtained from an api
async function renderArticles() {
    let data = await getData();

    if (!data.articles || !data.articles.length) {
        renderFail();
        return;
    }

    let template = "<h1>" + data.publication + "</h1>" + data.articles.map(function(article) {
        return `
                <article>    
                    <strong id="article-title"><a href="${article.url}">${article.title}</a></strong> 
                    <p id="article-author">by ${article.author}</p>
                    <p id="article-body">${article.article}</p>
                </article>   
                `
        }).join('');

    // Render the template to the DOM
    app.innerHTML = template;
}

// Render the articles on initial page load
renderArticles();
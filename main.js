// VARIABLES
let app = document.getElementById('app');


// FUNCTIONS

/**
 * Sanitize and encode all HTML in a user-submitted string
 * https://portswigger.net/web-security/cross-site-scripting/preventing
 * @param  {String} str  The user-submitted string
 * @return {String} str  The sanitized string
 */
function sanitizeHTML (str) {
	return str.toString().replace(/javascript:/gi, '').replace(/[^\w-_. ]/gi, function (c) {
		return `&#${c.charCodeAt(0)};`;
	});
}

// This function will fetch api data and return the data content in JSON
async function fetchData(url) {
    let response = await fetch(url);

    // If the response is not okay (anything other than code 200), then throw an error code
    if (!response.ok) {
        throw response.status;
    }
    
    // Otherwise, convert the response data into JSON format
    let content = await response.json();
    return content;
}

// This function renders an error message if no data is displayed on the page
function renderFail() {
    app.innerHTML = `<p>Uh-oh...the articles have went up in flames! Unable to display any data at this time.</p>`
}

// This function displays each article from the data obtained from an api
async function renderArticles() {
    // Fetch and store the responses' data
    let data = await Promise.all([
        fetchData('https://vanillajsacademy.com/api/dragons.json'), 
        fetchData('https://vanillajsacademy.com/api/dragons-authors.json')
    ]);

    let dragons = data[0];
    let dragonsAuthors = data[1];

    // Create and render the template to the DOM
    let template = "<h1>" + sanitizeHTML(dragons.publication) + "</h1>" + dragons.articles.map(function(article) {
        let author = dragonsAuthors.authors.find(function(dragonsAuthor) {
            return dragonsAuthor.author === article.author
        })
        return `
                <article>    
                    <strong id="article-title"><a href="${sanitizeHTML(article.url)}">${sanitizeHTML(article.title)}</a></strong> 
                    <p id="article-author"><em>By ${sanitizeHTML(author ? `${author.author} - ${author.bio}` : article.author)}</em></p>
                    <p id="article-body">${sanitizeHTML(article.article)}</p>
                </article>
                `
        }).join('');

    app.innerHTML = template;
}

// Render the articles on initial page load
renderArticles().catch(function(e) {
    console.warn(e);
    renderFail();
});
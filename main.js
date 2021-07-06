let app = document.getElementById('app');

async function renderArticles() {
    // Fetch a response from the api
    let response = await fetch('https://vanillajsacademy.com/api/dragons.json');
    // If the response is not okay (anything other than code 200), then return an error message 
    if (!response.ok) {
        throw `Unfortunately, something went wrong...please view the following error code: ${response.status}`
    }

    // Otherwise, convert the response data into JSON format
    let data = await response.json();

    // Store api data - this data is referenced in the 'template' variable
    let mainTitle = data.publication;
    let articles = data.articles.map(function(article) {
        return `<li>
                    <div>
                        <strong id="article-title"><a href="${article.url}">${article.title}</a></strong> 
                        <p id="article-author">by ${article.author}</p>
                        <p id="article-body">${article.article}</p>
                    </div>
                </li>`
        }).join('');

    let template = `<h1>${mainTitle}</h1>
                    <ul>${articles}</ul>
    `
    // Render the template (and its data) to the DOM
    app.innerHTML = template;
}

renderArticles();
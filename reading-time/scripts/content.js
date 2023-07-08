const article = document.querySelector("article");
if (article) {
    const text = article.textContent;
    const wordMatchRegex = /[^\s]+/g;
    const words = text.matchAll(wordMatchRegex);
    // matchAll returns an iterator, convert to array to get word count
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} min read`;

    // Support for API reference docs
    const heading = article.querySelector("h1");
     // Support for article docs with date
    const date = article.querySelector("time")?.parentNode;
    (date ?? heading).insertAdjacentElement("afterend", badge);
}


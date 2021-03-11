import {urlPatterns} from "./url";
import {fetchPageContent, guessIfAnArticle, notification} from "./utils";

export default function () {
    function contextMenuClickHandler () {
        chrome.tabs.query({
            active: true, lastFocusedWindow: true,
        }, (tabs) => {
            let url = tabs[0].url;
            if ( !guessIfAnArticle(url) ) {
                notification(`The ${url} doesn't seem like an article.`, 'This is not an article');
                return;
            }

            notification(`Current page will be fetched anonymously. [${url}]`, 'Read article anonymously');
            fetchPageContent(url);
        });
    }

    chrome.contextMenus.create({
        title: "Read article anonymously",
        contexts: ["all"],
        onclick: contextMenuClickHandler,
        documentUrlPatterns: urlPatterns,
    });
}

import {urlPatterns} from "./url";
import {browserNamespace, fetchPageContent, guessIfAnArticle, notification} from "./utils";

export default function () {
    function contextMenuClickHandler () {
        browserNamespace().tabs.query({
            active: true, lastFocusedWindow: true,
        }, (tabs) => {
            let url = tabs[0].url;
            if ( !guessIfAnArticle(url) ) {
                notification(`The link ${url} doesn't seem like an article page.`, 'This is not an article');
                return;
            }

            notification(`The link will be unlocked in a new tab. [${url}]`, 'Unlocking the article');
            fetchPageContent(url);
        });
    }

    browserNamespace().contextMenus.create({
        title: "Unlock this article",
        contexts: ["all"],
        onclick: contextMenuClickHandler,
        documentUrlPatterns: urlPatterns,
    });
}

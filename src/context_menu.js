import {browserNamespace, CONFIGURATION, openArticleInNewTab, guessIfAnArticle, notification} from "./utils";

export default function () {
    function contextMenuClickHandler () {
        browserNamespace().tabs.query({
            active: true, lastFocusedWindow: true,
        }, (tabs) => {
            let url = tabs[0].url;
            if ( !guessIfAnArticle(url) ) {
                notification(`The link doesn't seem like an article page. ${url}`, 'This is not an article');
                return;
            }

            notification(`The link will be unlocked in a new tab. [${url}]`, 'Unlocking the article');
            openArticleInNewTab(url);
        });
    }

    browserNamespace().contextMenus.create({
        title: "Unlock this article",
        contexts: ["all"],
        onclick: contextMenuClickHandler,
        documentUrlPatterns: CONFIGURATION.url_patterns,
    });

    return Promise.resolve();
}

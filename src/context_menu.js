import {
    browserNamespace, CONFIGURATION, getActiveTab, validateIfAnArticlePage, notification, openArticleInNewTab
} from "./utils";

export default function () {
    function contextMenuAnonymous () {
        getActiveTab().then(tab => new Promise(resolve => {
            return resolve(tab.url);
        })).then(validateIfAnArticlePage).then(url => {
            notification(`The link will be unlocked in a new tab. [${url}]`, 'Unlocking the article');
            openArticleInNewTab(url);
        }).catch(url => {
            notification(`The link doesn't seem like an article page. ${url}`, 'This is not an article');
        });
    }

    browserNamespace().contextMenus.create({
        title: "Unlock this article",
        id: 'medium-unlock-parent-context-menu',
        contexts: ["all"],
        documentUrlPatterns: CONFIGURATION.url_patterns,
    });

    /**
     * Child Context menu - New tab
     */
    browserNamespace().contextMenus.create({
        'title': 'Anonymously in new tab',
        'parentId': 'medium-unlock-parent-context-menu',
        contexts: ["all"],
        onclick: contextMenuAnonymous,
    });

    return Promise.resolve();
}

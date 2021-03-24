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

    function contextMenuDebugger () {
        getActiveTab().then(tab => new Promise(resolve => {
            return resolve(tab.url);
        })).then(validateIfAnArticlePage).then(url => {
            console.log('opening in debugger');
        }).catch(url => {
            notification(`The link doesn't seem like an article page. ${url}`, 'This is not an article');
        });
    }

    /**
     * Parent context menu
     */
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

    /**
     * Child context menu - Debugger
     * Adds only if the debugger is available
     */
    if ( browserNamespace().debugger ) {
        browserNamespace().contextMenus.create({
            'title': 'With debugger',
            'parentId': 'medium-unlock-parent-context-menu',
            contexts: ["all"],
            onclick: contextMenuDebugger,
        });
    }

    return Promise.resolve();
}

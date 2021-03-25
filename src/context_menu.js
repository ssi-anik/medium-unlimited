import {
    browserNamespace, CONFIGURATION, getActiveTab, notification, openArticleInNewTab, validateIfAnArticlePage
} from "./utils";

export default function () {
    function anonymousContextHandler (info, tab) {
        validateIfAnArticlePage(tab.url).then(url => {
            notification(`The link will be unlocked in a new tab. [${url}]`, 'Unlocking the article');
            openArticleInNewTab(url);
        }).catch(url => {
            notification(`The link doesn't seem like an article page. ${url}`, 'This is not an article');
        });
    }

    function debuggerContextHandler (info, tab) {
        validateIfAnArticlePage(tab.url).then(url => {
            console.log('opening in debugger');
        }).catch(url => {
            notification(`The link doesn't seem like an article page. ${url}`, 'This is not an article');
        });
    }

    function createContextMenus () {
        /**
         * Parent context menu
         */
        browserNamespace().contextMenus.create({
            title: "Unlock this article",
            id: 'parent-context-menu',
            contexts: ["all"],
            documentUrlPatterns: CONFIGURATION.url_patterns,
        });

        /**
         * Child Context menu - New tab
         */
        browserNamespace().contextMenus.create({
            title: 'Anonymously in new tab',
            parentId: 'parent-context-menu',
            id: 'anonymous',
            contexts: ["all"],
            onclick: anonymousContextHandler,
        });

        /**
         * Child context menu - Debugger
         * Adds only if the debugger is available
         */
        if ( browserNamespace().debugger ) {
            browserNamespace().contextMenus.create({
                title: 'With debugger',
                parentId: 'parent-context-menu',
                id: 'debugger',
                contexts: ["all"],
                onclick: debuggerContextHandler,
            });
        }
    }

    /**
     * Unchecked runtime.lastError: Cannot create item with duplicate id
     * https://stackoverflow.com/a/37000388/2190689
     */
    browserNamespace().contextMenus.removeAll(createContextMenus);

    return Promise.resolve();
}

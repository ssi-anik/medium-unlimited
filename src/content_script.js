import {CONFIGURATION, redirectToUrl} from "./utils";

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if ( request[CONFIGURATION["redirection_key"]] ) {
        redirectToUrl(request[CONFIGURATION["redirection_key"]]);
    }

    return true;
});

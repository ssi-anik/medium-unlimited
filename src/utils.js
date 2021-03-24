export const CONFIGURATION = {
    version: '2.0.1',
    remote_config_url: 'https://ssi-anik.github.io/medium-unlimited/configuration.json',
    resolver_key: 'remote_resolver',
    redirection_key: 'redirect-to',
    resolver_url: '',
    url_patterns: [
        "https://*.medium.com/*",
    ],
};

export function browserNamespace () {
    return window.msBrowser || window.browser || window.chrome;
}

export function getTwitterReferer () {
    return `https://t.co/${Math.random().toString(36).slice(2)}`;
}

export function guessIfAnArticle (url) {
    const slug = new URL(url).pathname.split('/').pop();

    return slug.length > 0 && slug.split('-').length > 2;
}

export function notification (message, title = 'Medium unlimited') {
    const notification = {
        type: 'basic', iconUrl: 'static/logo.png', title, message
    };

    browserNamespace().notifications.create('medium-unlimited', notification);
}

export function passMessage (key, value, callback = null) {
    browserNamespace().tabs.query({active: true, lastFocusedWindow: true,}, function (tabs) {
        browserNamespace().tabs.sendMessage(tabs[0].id, {[key]: value}, callback);
    });
}

export function openArticleInNewTab (url) {
    // url = `https://medium.com/m/global-identity?redirectUrl=${encodeURIComponent(url)}`;
    const articleWithoutScheme = url.replace(/https?:\/\//, '');
    if ( CONFIGURATION.resolver_url.length === 0 ) {
        notification('Empty resolver URL in configuration. Reload the extension. Otherwise, create an issue.');
        return;
    }

    const remoteUrl = `${CONFIGURATION.resolver_url}/${articleWithoutScheme}`
    console.log(`New tab will open article link: ${remoteUrl}`);
    chrome.tabs.create({url: remoteUrl, active: true});
}

export function isUpdateAvailable (upstream) {
    return upstream.localeCompare(CONFIGURATION.version, undefined, {numeric: true, sensitivity: 'base'});
}

function checkIfResponseIsParsable (response) {
    if ( false === response.ok ) {
        console.log('error', response);
        return Promise.reject('Are you connected to the internet? Connect to the internet and reload extension again.');
    }

    return response.text();
}

export function mergeLocalConfigWithUpstream (config) {
    const {latest: upstreamVersion, remote_resolver, url_patterns} = config;

    switch ( isUpdateAvailable(upstreamVersion) ) {
        case 1:
            // this is downgraded version, remote has the updated version
            notification('There is an update available.');
            break;
        case 0:
        // this is the latest version
        case -1:
            // remote has the downgraded version, this is the updated version
            break;
    }

    CONFIGURATION.resolver_url = remote_resolver;
    CONFIGURATION.url_patterns = [...new Set(CONFIGURATION.url_patterns.concat(url_patterns))];

    return Promise.resolve();
}

export function registerInstallationCallback () {
    browserNamespace().runtime.onInstalled.addListener(() => {
        notification(`You're using the version ${CONFIGURATION.version}`, 'Installation Success');
    });

    return Promise.resolve();
}

export function fetchRemoteConfiguration () {
    return fetch(CONFIGURATION.remote_config_url).then(checkIfResponseIsParsable).then(response => {
        const config = JSON.parse(response);

        return Promise.resolve(config);
    });
}

export function getActiveTab () {
    return new Promise((resolve, reject) => {
        browserNamespace().tabs.query({
            active: true, lastFocusedWindow: true,
        }, (tabs) => {
            return resolve(tabs[0]);
        })
    });
}

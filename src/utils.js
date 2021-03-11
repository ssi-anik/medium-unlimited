export const CONFIGURATION = {
    version: '2.0.0',
    remote_config: 'https://ssi-anik.github.io/medium-unlimited/configuration.json',
    resolver_key: 'remote_resolver',
    redirection_key: 'redirect-to',
    resolver_url: '',
};

export function log (...messages) {
    if ( process.env.NODE_ENV === 'production' ) {
        return;
    }

    console.log(...messages);
}

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

export function registerInstallationCallback () {
    browserNamespace().runtime.onInstalled.addListener(() => {
        fetch(CONFIGURATION.remote_config).then(checkIfResponseIsParsable).then(parseUpstreamConfiguration).catch(e => {
            let message = e.toString();
            if ( e instanceof TypeError ) {
                message = e.message;
            }

            notification(message, 'Remote configuration error');
        });
    });
}

export function fetchPageContent (url) {
    // url = `https://medium.com/m/global-identity?redirectUrl=${encodeURIComponent(url)}`;
    const articleWithoutScheme = url.replace(/https?:\/\//, '');
    if ( CONFIGURATION.resolver_url.length === 0 ) {
        notification('Empty resolver URL in configuration. Reload the extension. Otherwise, create an issue.');
        return;
    }

    passMessage(CONFIGURATION.redirection_key, `${CONFIGURATION.resolver_url}/${articleWithoutScheme}`);
}

export function isUpdateAvailable (upstream) {
    return upstream.localeCompare(CONFIGURATION.version, undefined, {numeric: true, sensitivity: 'base'});
}

export function loadConfiguration () {
    console.log('Loading configuration');
    // load remote resolver if not loaded.
    if ( CONFIGURATION.resolver_url.length === 0 ) {
        browserNamespace().storage.local.get([CONFIGURATION.resolver_key], function (conf) {
            CONFIGURATION.resolver_url = conf[CONFIGURATION.resolver_key];
        })
    }
}

export function redirectToUrl (url) {
    console.log('redirecting article to: ' + url);
    window.open(url);
}

function checkIfResponseIsParsable (response) {
    if ( false === response.ok ) {
        return Promise.reject('Cannot fetch required configuration');
    }

    return response.text();
}

function parseUpstreamConfiguration (config) {
    config = JSON.parse(config);

    const upstreamVersion = config.latest || '0.0.0';

    switch ( isUpdateAvailable(upstreamVersion) ) {
        case 0:
            notification('You\'re using the latest version.');
            break;
        case 1:
        default:
            notification('There is an update available.');
            break;
    }

    const updatedConfiguration = {
        [CONFIGURATION.resolver_key]: config.remote_resolver || '',
    }
    browserNamespace().storage.local.remove(Object.keys(updatedConfiguration), function () {
        browserNamespace().storage.local.set(updatedConfiguration, function () {
            loadConfiguration();
        });
    });
}

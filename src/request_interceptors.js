import {browserNamespace, getTwitterReferer} from './utils';
import {urlPatterns} from './url';

export default function intercept () {
    function onBeforeSendHeaders (details) {
        if ( details.requestHeaders ) {
            let headers = removeHeader(details.requestHeaders, 'referer');
            headers = addHeader(headers, 'Referer', getTwitterReferer());

            return {requestHeaders: headers};
        }

        return {requestHeaders: details.requestHeaders};
    }

    function getBeforeSendExtraInfoSpec () {
        const extraInfoSpec = [
            'blocking',
            'requestHeaders'
        ];

        if ( browserNamespace().webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS') ) {
            extraInfoSpec.push('extraHeaders');
        }

        return extraInfoSpec;
    }

    function removeHeader (headers, headerToRemove) {
        return headers.filter(({name}) => name.toLowerCase() !== headerToRemove);
    }

    function addHeader (headers, name, value) {
        headers.push({name, value});

        return headers;
    }

    browserNamespace().webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, {
        urls: urlPatterns,
    }, getBeforeSendExtraInfoSpec());
}

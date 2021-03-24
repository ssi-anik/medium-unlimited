import registerRequestInterceptor from './request_interceptors';
import registerContextMenu from "./context_menu";
import {
    fetchRemoteConfiguration, mergeLocalConfigWithUpstream, notification, registerInstallationCallback
} from "./utils";

registerInstallationCallback()
    .then(fetchRemoteConfiguration)
    .then(mergeLocalConfigWithUpstream)
    .then(registerContextMenu)
    .then(registerRequestInterceptor)
    .catch(e => {
        let message = e.toString();
        if ( e instanceof TypeError ) {
            message = e.message;
        }

        notification(message, 'Error!');
    });

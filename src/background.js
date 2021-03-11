import intercept from './request_interceptors';
import context_menu from "./context_menu";
import {loadConfiguration, registerInstallationCallback} from "./utils"; //Importing just to make sure the interceptors are registered.

registerInstallationCallback();

loadConfiguration();

intercept();

context_menu();

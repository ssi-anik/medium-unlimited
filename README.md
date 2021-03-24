# Medium Unlimited [![Github All Releases](https://img.shields.io/github/downloads/ssi-anik/medium-unlimited/total.svg)]()

Code repository for the browser extension to unlock the articles behind the medium.com membership paywall.

## Attention

| :thought_balloon: This repository is separately maintained than the upstream repository. |
| --- |

## Features

- This repository uses the remote service from [MahirJhaveri/medium-hackd](https://github.com/MahirJhaveri/medium-hackd)
  when user wants to unlock articles from the browser context menu (Until they request to remove the service).
- The same release should work in most of the browsers.
    * Firefox
    * Chrome
    * Edge
    * Opera
- As the extension is not distributed through the stores, if you reload the extension from extensions/add-ons page, it
  should show if there is any update available.
- Without any major release, no need for extension update. Uses remote configuration to fetch URLs when loaded (Requires internet connection).

## Installation

- Download the latest archive
  from [Releases menu](https://github.com/ssi-anik/medium-unlimited/releases/latest/download/medium-unlimited.zip).
- Extract the archive.
- From
    * Chrome visit `chrome://extensions`.
    * Opera visit `opera://extensions`.
    * Edge visit `edge://extensions`.
    * Find Developer mode button/toggle switch and enable it.
    * Click `Load Unpacked`. Then show the path where you extracted the archive.
- From
    * Firefox visit `about:debugging#/runtime/this-firefox`
    * Click `Load Temporary Add-on`. Then show the path where your extracted the archive.

---

**When using Firefox, if you use the context menu "Unlock this article", you may need to whitelist the website to allow
to open the link in a new tab**

---

## Development

Run the following to build the code:

```shell
yarn run watch         # For local development
#or
yarn run build         # For production release
```

This will generate the bundle and other required files in ./dist directory. Then follow the installation process.

## Some links are missing

~~I have already added a bunch of domains. If you think some links should be added, then visit `src/urls.js`, add the URL
pattern to the array in alphabetic order. Submit a PR. And if the PR gets merged and put a tag, it'll automatically add
a new release and non-technical person can be facilitated.~~

All the URLs are pulled from the remote [configuration file](https://github.com/ssi-anik/medium-unlimited/blob/gh-pages/configuration.json). If you need to add URL, then send a PR to the `gh-pages` branch. And if you're using your fork, then you can add them to the `src/utls.js`'s `CONFIGURATION.url_patterns`. It'll get merged on the browser **restart** or the installation of the extension.

Even if you close the Chrome browser, it keeps processes running in the background. So, you'll need to kill all those processes to let the extension load again from the start as if the PC has just restarted.

## Not sure how to add the link?

- Copy the URL. Let's assume the URL is https://example.com.
- If there is any possibility of having a sub-domain then the pattern will be `https://*.example.com/*`
- If there is no sub-domain available, then the pattern will be `https://example.com/*`.

The sub-domain pattern should work in all cases.

## Issues

If the context menu's "Unlock this article" does not work, please open an issue.

# Screenshot:

![alt text](https://raw.githubusercontent.com/manojVivek/medium-unlimited/master/designs/screenshot.png "Before after comparison")

# Medium Unlimited   [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Yay!!%20I%20found%20this%20open%20source%20chrome%20extension%20to%20read%20Medium.com%20membership%20articles%20for%20free!%20%0ACheck%20it%20out%20-%20&url=https://github.com/manojVivek/medium-unlimited&hashtags=medium,membership,free,github,oss,opensource)

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

## Installation

- Download the latest archive
  from [Releases menu](https://github.com/ssi-anik/medium-unlimited/releases/latest/download/medium-unlimited.zip).
- Extract the archive.
- From Chrome visit `chrome://extensions`.
- From Opera visit `opera://extensions`.
- From Edge visit `edge://extensions`.
- Find Developer mode button/toggle switch and enable it.
- Click load unpacked `Load Unpacked`. Then show the path you extracted the archive.

## Development

Run the following to build the code:

```shell
yarn run watch         #For local development
#or
yarn run build         #For production release
```

This will generate the bundle and other required files in ./dist directory. Then follow the installation process.

## Some links are missing

I have already added a bunch of domains. If you think some links should be added, then visit `src/urls.js`, add the URL
pattern to the array in alphabetic order. Submit a PR. And if the PR gets merged and put a tag, it'll automatically add
a new release and non-technical person can be facilitated.

## Not sure how to add the link?

- Copy the URL. Let's assume the URL is https://example.com. 
- If there is any possibility of having a sub-domain then the pattern will be `https://*.example.com/*`
- If there is no sub-domain available, then the pattern will be `https://example.com/*`.

But the sub-domain pattern should work in all cases.


# Screenshot:

![alt text](https://raw.githubusercontent.com/manojVivek/medium-unlimited/master/designs/screenshot.png "Before after comparison")

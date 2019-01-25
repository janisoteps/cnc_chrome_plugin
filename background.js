// background.js
'use strict';

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    css : ["section[id='viewer-main']"],
                    // Hits both direct url experiences and channel experiences, works after version 2.0.0
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    css: [".zmags-viewer-container"]
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

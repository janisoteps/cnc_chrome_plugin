// popup.js
'use strict';

document.getElementById("changeColor").addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'change_overlay'}, function(response) {
            console.log(`Response: ${response}`);
        });
    });
});

document.getElementById("getInfo").addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {text: 'get_exp_id'}, function(response) {
            console.log(`Response: ${response}`);

            let expInfoContainer = document.getElementById("expInfo");

            if (response.viewer === 'cnc') {
                expInfoContainer.innerHTML = `<h5>Experience ID: ${response.expId}</h5>`
                    + `<h5>Viewer: <bold>${response.viewer}</bold></h5>`
                    + `<a href="https://cnc-api.zmags.com/view/lite/${response.expId}" target="_blank">`
                    + `<button class="exp-action" id="openInViewer">Open in viewer</button></a>`
                    + `<a href="https://cnc-api.zmags.com/output/lite/${response.expId}" target="_blank">`
                    + `<button class="exp-action" id="openInViewer">Get Output</button></a>`
                    + `<a href="https://creator.zmags.com/#experience/${response.expId}/edit/1" target="_blank">`
                    + '<button class="exp-action" id="editExp">Edit experience</button></a>';
            } else {
                expInfoContainer.innerHTML = `<h5>Experience ID: ${response.expId}</h5>`
                    + `<h5>Viewer: <bold>${response.viewer}</bold></h5>`
                    + `<a href="https://c.zmags.com/viewer.html#${response.expId}" target="_blank">`
                    + `<button class="exp-action" id="openInViewer">Open in viewer</button></a>`
                    + `<a href="https://creator.zmags.com/#experience/${response.expId}/edit/1" target="_blank">`
                    + '<button class="exp-action" id="editExp">Edit experience</button></a>';
            }
        });
    });
});

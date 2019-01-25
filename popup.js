// popup.js
'use strict';

function getGroupData(groupId, callback) {
    console.log(`getting group info for: ${groupId}`);
    function handleResponse() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            console.log(JSON.parse(httpRequest.response).entries[0]['reference']['resourceId']);
            if (httpRequest.status === 200) {
                callback(JSON.parse(httpRequest.response).entries[0]['reference']['resourceId'])
            } else {
                console.log('There was a problem with the request.');
            }
        }
    }
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open('GET', `https://c.zmags.com/api/groups/${groupId}`, true);
    httpRequest.send();
}

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
                if (response.type === 'experience') {
                    expInfoContainer.innerHTML = `<h5>Experience ID: ${response.expId}</h5>`
                        + `<h5>Viewer: <bold>${response.viewer}</bold></h5>`
                        + `<a href="https://cnc-api.zmags.com/view/lite/${response.expId}" target="_blank">`
                        + `<button class="exp-action" id="openInViewer">Open in viewer</button></a>`
                        + `<a href="https://cnc-api.zmags.com/output/lite/${response.expId}" target="_blank">`
                        + `<button class="exp-action" id="openInViewer">Get Output</button></a>`
                        + `<a href="https://creator.zmags.com/#experience/${response.expId}/edit/1" target="_blank">`
                        + '<button class="exp-action" id="editExp">Edit experience</button></a>';
                } else if (response.type === 'group') {
                    getGroupData(response.expId, function(apiExpId) {
                        console.log(`Group experience id: ${apiExpId}`);
                        expInfoContainer.innerHTML = `<h5>Experience ID: ${apiExpId}</h5>`
                            + `<h5>Viewer: <bold>${response.viewer} group</bold></h5>`
                            + `<a href="https://cnc-api.zmags.com/view/lite/${apiExpId}" target="_blank">`
                            + `<button class="exp-action" id="openInViewer">Open in viewer</button></a>`
                            + `<a href="https://cnc-api.zmags.com/output/lite/${apiExpId}" target="_blank">`
                            + `<button class="exp-action" id="openInViewer">Get Output</button></a>`
                            + `<a href="https://creator.zmags.com/#experience/${apiExpId}/edit/1" target="_blank">`
                            + '<button class="exp-action" id="editExp">Edit experience</button></a>';
                    });
                }
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

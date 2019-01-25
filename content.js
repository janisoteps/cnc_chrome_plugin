// content.js

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log('Clicked');
    console.log(`msg.text : ${msg.text}`);

    // If the received message has the expected format...
    if (msg.text === 'get_exp_id') {
        const expViewerCnc = document.getElementsByClassName("zmags-viewer-container");
        let expIdCNC = null;
        if (expViewerCnc[0]) {
            expIdCNC = expViewerCnc[0].dataset.experience;
        }

        let expIframeClassic = document.querySelectorAll(["iframe[id^='zmags_experience_']"]);
        if (!expIframeClassic) {
            expIframeClassic = document.querySelectorAll(["iframe[id^='zmags_group_']"]);
        }
        let expIdClassic = null;
        if (expIframeClassic[0]) {
            expIdClassic = expIframeClassic[0].parentElement.dataset.experience;
        }

        console.log(`expIdCNC: ${expIdCNC}`);
        console.log(`expIdClassic: ${expIdClassic}`);
        if (expIdCNC) {
            sendResponse({
                expId: expIdCNC,
                viewer: 'cnc'
            });
        } else {
            sendResponse({
                expId: expIdClassic,
                viewer: 'classic'
            });
        }
    }

    if (msg.text === 'change_overlay') {
        console.log('Overlay change');
        var overlayDiv = document.getElementById('overlay');
        if (!overlayDiv) {
            let expIframe = document.querySelectorAll(["iframe[id^='zmags_experience_']"]);
            if (expIframe[0]) {
                overlayDiv = expIframe[0].contentDocument.getElementById('overlay')
            }
        }
        if (!overlayDiv) {
            let groupIframe = document.querySelectorAll(["iframe[id^='zmags_group_']"]);
            if(groupIframe[0]) {
                overlayDiv = groupIframe[0].contentDocument.getElementById('overlay')
            }
        }
        if (overlayDiv) {
            overlayDiv.parentElement.removeChild(overlayDiv);
        } else {
            let sceneOverlay = document.getElementsByClassName('scene-overlay')[0];
            let cncDiv = document.createElement("div");
            cncDiv.id = 'overlay';
            cncDiv.style.position = "absolute";
            cncDiv.style.top = "0";
            cncDiv.style.left = "0";
            cncDiv.style.width = "100%";
            cncDiv.style.height = "100%";
            cncDiv.style['z-index'] = "10";
            cncDiv.style['pointer-events'] = "none";
            cncDiv.style['box-shadow'] = 'inset 0px 0px 10px 5px #b932fc';
            if (sceneOverlay) {
                sceneOverlay.appendChild(cncDiv);
                if (document.getElementsByClassName('scene-overlay')[1]) {
                    document.getElementsByClassName('scene-overlay')[1].appendChild(cncDiv)
                }
            }

            let classicIframe = document.querySelectorAll(["iframe[id^='zmags_experience_']"])[0];
            if (typeof classicIframe === undefined) {
                classicIframe = document.querySelectorAll(["iframe[id^='zmags_group_']"])[0];
            }

            if(classicIframe) {
                let classicDiv = document.createElement("div");
                classicDiv.id = 'overlay';
                classicDiv.style.position = "absolute";
                classicDiv.style.top = "0";
                classicDiv.style.left = "0";
                classicDiv.style.width = "100%";
                classicDiv.style.height = "100%";
                classicDiv.style['z-index'] = "10";
                classicDiv.style['pointer-events'] = "none";
                classicDiv.style['box-shadow'] = 'inset 0px 0px 10px 5px #1e50e8';
                classicIframe.contentDocument.body.appendChild(classicDiv);
            }
        }
        sendResponse('Done')
    }
});

var serverhost = 'http://127.0.0.1:8000';

chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if(changeInfo.url)
        {
            var pattern = new RegExp('^chrome://');
            if(!pattern.test(tab.url)) {

                var url = serverhost + '/detect/sitecheck/?url='+ encodeURIComponent(tab.url) ;            
                fetch(url)
                .then(response => response.json())
                .then(response => {
                        let result = response;
                        var err = result.error;

                        var messagestring = "";
                        if(err == true)
                            messagestring += "Error getting to server. You may continue browsing.";
                        else {
                            var stt = result.status;
                            if(stt == false){
                                messagestring += "This site is marked malicious. The following strings are suspected to be XSS attacked:\n";
                                messagestring += "The following (showing " 
                                    + Math.min(result.lines, 5) + " of " 
                                    + result.lines + " of strings found) are marked malicious:\n"
                                var i;
                                for(i=0; i < Math.min(result.lines, 5); i++)
                                    messagestring += result.i + "\n"
                                chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                                    chrome.tabs.executeScript(
                                        null,
                                        { code: 'var s = document.documentElement.outerHTML; document.documentElement.innerHTML="<h1>Site marked <span color=`red`>Unsafe</span></h1>  <button onclick=location.reload()><h3>Click here to continue</h3></button>"; chrome.runtime.sendMessage({action: "getSource", source: s});' }
                                    );
                                });
                            }
                            else {
                            
                                messagestring += "Site marked safe.";

                            }
                            var notifOptions = {
                                type: "basic",
                                iconUrl: "icon48.png",
                                title: "XSS Summary for URL",
                                message: messagestring
                            };
                            
                            chrome.notifications.create('XSSNotif', notifOptions);
                        }
                })	
                .catch(error => { 
                    console.log(error);
                });
            }
        }
    }
)

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
            
        var url = serverhost + '/detect/sitecheck/?url='+ encodeURIComponent(request.topic) ;

        fetch(url)
        .then(response => response.json())
        .then(response => sendResponse({farewell: response}))
        .catch(error => { 
            response = {
                "status":"not done"
            };
            sendResponse({farewell: response});
        });
            
        return true;  // Will respond asynchronously.


    });
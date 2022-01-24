var serverhost = 'http://127.0.0.1:8000';

chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if(changeInfo.url)
        {
            var pattern = new RegExp('^chrome://');
            var pattern2 = new RegExp('^devtools://');

            if(!pattern.test(tab.url) && !pattern2.test(tab.url)) {
                var url = tab.url; //Assuming it is working fine as per your post
                var urlObj = new URL(url);
                var host = urlObj.host;
                var url = serverhost + '/detect/sitecheck/?url='+ encodeURIComponent(tab.url) ;            
                fetch(url)
                .then(response => response.json())
                .then(response => {
                        let result = response;
                        var err = result.error;
                        var code = result.code;
                        console.log(code)
                        console.log(result)
                        var messagestring = "";
                        if(code==500){
                            chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                                chrome.tabs.executeScript(
                                    null,
                                    { code: 'var s = document.documentElement.outerHTML; document.documentElement.innerHTML="<h1>Site marked <span color=`red`>please browse on your own risk as this website is not scrapable</span></h1>  <button onclick=(location.reload())><h3>Click here to continue</h3></button>"; chrome.runtime.sendMessage({action: "getSource", source: s});' }
                                );
                            });
                        }


                        if(err == true)
                            messagestring += "Error getting to server. You may continue browsing.";
                        else {
                            var stt = result.status;
                            var count = result.lines
                            if(stt == false) {
                                if (count <= 6)
                                     messagestring += "Site marked safe.";
                                else if (count>6 && count<=10) {
                                    messagestring += "This website may be malicious. You may continue browsing.";
                                    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                                        chrome.tabs.executeScript(
                                            null,
                                            {
                                                file: './scriptMaybe.js',
                                            }
                                            // { code: 'var s = document.documentElement.outerHTML;  document.documentElement.innerHTML="<h1>Site marked <span color=`red`>Unsafe</span></h1>  <button onclick=performClick()><h3>Click here to continue</h3></button>"; chrome.runtime.sendMessage({action: "getSource", source: s});' }
                                        );
                                    });
                                } else {

                                    messagestring += "This site is malicious. The following strings are suspected to be XSS attacked:\n";
                                    messagestring += "The following (showing "
                                        + Math.min(result.lines, 5) + " of "
                                        + result.lines + " of strings found) are marked malicious:\n"
                                    var i;
                                    for (i = 0; i < Math.min(result.lines, 5); i++)
                                        messagestring += result.i + "\n"
                                    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
                                        chrome.tabs.executeScript(
                                            null,
                                            {
                                                file: './script.js',
                                            }
                                            // { code: 'var s = document.documentElement.outerHTML;  document.documentElement.innerHTML="<h1>Site marked <span color=`red`>Unsafe</span></h1>  <button onclick=performClick()><h3>Click here to continue</h3></button>"; chrome.runtime.sendMessage({action: "getSource", source: s});' }
                                        );
                                    });
                                }
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
    console.log("a", request)
        if (request.action == "allow_url")
        {
            var url = request.url;
            console.log(url)
            sendResponse({source: request.source});
        }
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
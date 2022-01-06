$(function(){



    $('#urlsubmit').click(function(){
		
		var check_url = $('#url').val();
		console.log(check_url)
				
		if (check_url){
                chrome.runtime.sendMessage(
					{topic: check_url},
					function(response) {
                        if(response === undefined)
                        {
                            console.log("Invalid Url");
                            return;
                        }
                        result = response.farewell;
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
                            }
                            else {
                                messagestring += "Site marked safe.";
                            }
                        }
                        
						var notifOptions = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "XSS Detection Summary for URL:",
                            message: messagestring
						};
						
						chrome.notifications.create('XSSNotif', notifOptions);
						
					});
		}		
		$('#keyword').val('');
		
    });
});
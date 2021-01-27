noti = "";

  window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "0727e2e0-25b1-456a-9e64-034a935c0878",
      notifyButton: {
        enable: true,
      },
    });
  });



ThunkableWebviewerExtension.receiveMessage(function(message)
    {           
         noti = message;             
         sendMessage();                
    });
function sendMessage()
{      
  console.log(noti);
    OneSignal.setSubscription(true);      
                                                                                   
              web_buttons=[
               {
               "id":"Yes",
               "text":"I am willing" ,
                "url": "https://example.com/?_osp=do_not_open"
               },
               {
                 "id":"NO",
                 "text":"I am not willing",
                 "url": "https://example.com/?_osp=do_not_open"
               }]                 
              const body = {    
               "app_id": "0727e2e0-25b1-456a-9e64-034a935c0878",               
               "contents": {"en": "Hello, someone is waiting for you!!!! If you want to aceept the job request, click on I am willing"},
               "headings" : {"en": "A job request!"},
               "data": {"foo":"bar"},                                          
               "include_player_ids":[noti],             
               "web_buttons": web_buttons
              }           
              fetch('https://onesignal.com/api/v1/notifications', {
                     method: 'POST',
                     body: JSON.stringify(body),
                      headers: {               
                        "Content-type": "application/json; charset=utf-8",
                        "Authorization": "Basic NzJjNTg0NzUtMzU2Zi00OTExLTgzMTktZmJjM2Y5NDQ5Y2E4"
                      }
                 }).then(response => response.json())
                  .then(json => {
                     console.log(json);
                });}
OneSignal.push(["addListenerForNotificationOpened", function(event) {
  console.log("OneSignal notification clicked:", event); 
  
    if (event.action === "") {
     console.log('body is clicked');
     ThunkableWebviewerExtension.postMessage(noti);
    } else if (event.action === 'Yes') {      
      console.log('yes is clicked');
      ThunkableWebviewerExtension.postMessage(noti);
    } else if (event.action === 'NO') { 
      console.log('no is clicked');
    } 
  
}]);


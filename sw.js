noti = "";
window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "2e7a2add-017c-4365-8d3c-9ffe6b62582f",
      notifyButton: {
        enable: true,
      },
      subdomainName: "mk-mahikrish",
       welcomeNotification: {
      "title" :"A message from befriend O'bot",
      "message": "Thanks for joining befriend. This is a place where professionals like you and customers meet together.",
     "url": "https://www.google.com" 
       }
    });
  });  

function isPushNotificationsEnabledVerbose() {
    console.log('isPushNotificationsEnabledVerbose()');
    Promise.all([
            OneSignal.isPushNotificationsEnabled(),
            OneSignal.getUserId(),
            OneSignal.getRegistrationId(),
            OneSignal.getNotificationPermission(),
            OneSignal.isOptedOut()          
        ])
        .then(([isSubscribed, userId, registrationId, notificationPermission, optedOut]) => {
            console.log('Is Completely Subscribed:', isSubscribed);
            console.log('');
            console.log('What is our OneSignal user ID?', userId);
            console.log('What is our push subscription token?', registrationId);
            console.log('What is the notification permission status?', notificationPermission);
            console.log('Are you manually opted out?', optedOut);            
            console.log('What is the current URL of this page?', location.href);
            console.log("What environment does OneSignal think it's in?", OneSignal.sdkEnvironment.getWindowEnv());
        })
        .catch(e => {
            console.error("Issue determining whether push is enabled:", e);
        });
}
isPushNotificationsEnabledVerbose();
OneSignal.log.setLevel('warn');
function prompt()
{
  OneSignal.push(function() {
   OneSignal.showNativePrompt(); 
  }); 
}
 ThunkableWebviewerExtension.receiveMessage(function(message) {             
          if(message == null){            
            console.log(message);            
          }else{
            noti = message;
            console.log(message);   
          sendMessage();           
          }
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
               "app_id": "2e7a2add-017c-4365-8d3c-9ffe6b62582f",
               "include_player_ids":[noti],
               "headings" : {"en": "A job request!"},                    
               "contents": {"en": "Hello, someone is waiting for you!!!! If you want to aceept the job request, click on I am willing"},
               "web_buttons": web_buttons
              }           
              fetch('https://onesignal.com/api/v1/notifications', {
                      method: 'POST',
                     body: JSON.stringify(body),
                      headers: {               
                        "Content-type": "application/json; charset=utf-8",
                        "Authorization": "Basic YzE0ZDk1NzYtYTExNS00YmMzLTk4ZWItMWFlOTNiNzA5NTJm"
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


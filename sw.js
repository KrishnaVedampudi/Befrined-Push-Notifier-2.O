noti = "";
window.OneSignal = window.OneSignal || [];
  OneSignal.push(function() {
    OneSignal.init({
      appId: "2e7a2add-017c-4365-8d3c-9ffe6b62582f",
 promptOptions: {
  customlink: {
    enabled: true,
    style: "button", 
    size: "medium", 
    color: {
      button: '#E12D30', 
      text: '#FFFFFF',
    },
    text: {
      subscribe: "Recieve Job Requests from Customers", /* Prompt's text when not subscribed */
      unsubscribe: "Unsubscribe from push notifications", 
      explanation: "Hi, Please click Recieve job requests so that any customer will notify you if they need you", /* Optional text appearing before the prompt button */
    },
    unsubscribeEnabled: true,
  }
},
      subdomainName: "mk-mahikrish",
       welcomeNotification: {
      "title" :"A message from befriend O'bot",
      "message": "Thanks for joining befriend. This is a place where professionals like you and customers meet together.",
     "url": "https://www.google.com" 
       }
    });
  });
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


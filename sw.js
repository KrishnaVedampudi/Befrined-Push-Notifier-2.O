window.OneSignal = window.OneSignal || [];
OneSignal.push(function() {
  OneSignal.init({
    appId: "2e7a2add-017c-4365-8d3c-9ffe6b62582f",
    notifyButton: {
      enable: true,
    },
    subdomainName:  "mk-mahikrish",
    welcomeNotification: {
      "title" :"A message from befriend O'bot",
      "message": "Thanks for joining befriend. This is a place where professionals like you and customers meet together.",
     "url": "https://www.google.com" 
    }});});
function prompt()
{
  OneSignal.push(function() {
   OneSignal.showNativePrompt(); 
  }); 
}
function sendMessage()
{      
    OneSignal.setSubscription(true);
        ThunkableWebviewerExtension.receiveMessage(function(message) {             
          if(message == null){            
            console.log(message);
          }else{
                                                                                   
              web_buttons=[
               {
               "id":"Yes",
               "text":"I am willing" 
               },
               {
                 "id":"NO",
                 "text":"I am not willing"
               }]                 
              const body = {    
               "app_id": "2e7a2add-017c-4365-8d3c-9ffe6b62582f",
               "include_player_ids":[message],
               "channel_for_external_user_ids": "push",
               "data": {"foo": "bar"},           
               "contents": {"en": "Hello, someone is waiting for you!!!! If you want to aceept the job request, click on I am willing"},
               "web_buttons": web_buttons
              }           
              fetch('https://onesignal.com/api/v1/notifications', {
                      method: 'POST',
                     body: JSON.stringify(body),
                      headers: {               
                         'Content-type': 'application/json; charset=UTF-8',
                         'Authorization': 'Basic YzE0ZDk1NzYtYTExNS00YmMzLTk4ZWItMWFlOTNiNzA5NTJm'}
                 }).then(response => response.json())
                  .then(json => {
                     console.log(json);
                });}
              OneSignal.push(["addListenerForNotificationOpened", function(event) {       
                if (event.action === 'Yes') {       
                  ThunkableWebviewerExtension.postMessage(message);          
                } else if (event.action === 'No') {                 
                  alert("Thanks for your immediate reply");                
                }}]);});}  

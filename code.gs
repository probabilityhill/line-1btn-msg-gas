const ACCESS_TOKEN = 'ここにChannel access tokenを貼り付ける';

function doPost(e){
  var event = JSON.parse(e.postData.contents).events[0];
  if(event.type === "message"){
    if(event.message.type === "text"){
      var text = event.message.text;
      switch(text){
        case "テスト":
          var reply_token = event.replyToken;
          var messages = [{
            'type':'flex',
            'altText':'this is a flex message',
            'contents': 
              {
                "type": "bubble",
                "body": {
                  "type": "box",
                  "layout": "vertical",
                  "contents": [
                    {
                      "type": "button",
                      "action": {
                        "type": "message",
                        "label": "クリック",
                        "text": "クリックした！"
                      }
                    }
                  ],
                  "paddingAll": "0px"
                }
              }
            }];
          sendReplyMessage(reply_token, messages);
      }
    }
  }
}

function sendReplyMessage(reply_token, messages){
  var url = 'https://api.line.me/v2/bot/message/reply';
  var res = UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages 
    }),
  });
  return res;
}

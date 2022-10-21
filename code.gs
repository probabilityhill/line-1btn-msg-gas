// 環境変数を設定
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();              // スクリプトプロパティを取得
SCRIPT_PROPERTIES.setProperty("ACCESS_TOKEN", "ここにアクセストークンを入力");   // 1度実行したら削除する
// アクセストークンの取得
const ACCESS_TOKEN = SCRIPT_PROPERTIES.getProperty("ACCESS_TOKEN");

// Flex Message Simulatorで作成したJSONコード
const CLICK_BTN = {
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
};

// Flex Messageを取得
function getFlexMsg(label, content){
  return {
    "type": "flex",
    "altText": label,
    "contents": content
  };
}

// イベントを受け取って実行する
function doPost(e){
  const EVENTS = JSON.parse(e.postData.contents).events;
  for (const event of EVENTS){
    execute(event);
  }
}

// イベントを実行する
function execute(event){
  const EVENT_TYPE = event.type;          // イベントのタイプ
  const REPLY_TOKEN = event.replyToken;   // 応答メッセージを送る際に使用する応答トークン
  
  if(EVENT_TYPE === "message"){           // メッセージイベントの場合
    let messages;                         // 送信するメッセージオブジェクト
    if(event.message.type === "text"){    // テキストメッセージの場合
      let text = event.message.text;      // 受け取ったテキスト
      switch(text){
        case "テスト":
          messages = [getFlexMsg("ボタン", CLICK_BTN)];
          break;
      }
    }
    sendReplyMessage(REPLY_TOKEN, messages);
  }
}

// メッセージを送信
function sendReplyMessage(replyToken, messages){
  const URL = "https://api.line.me/v2/bot/message/reply";
  const RES = UrlFetchApp.fetch(URL, {
    "headers": {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + ACCESS_TOKEN,
    },
    "method": "post",
    "payload": JSON.stringify({
      "replyToken": replyToken,
      "messages": messages 
    }),
  });
  return RES;
}

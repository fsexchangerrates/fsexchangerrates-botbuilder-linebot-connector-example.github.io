import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { LineConnector, Sticker, Location } from "botbuilder-linebot-connector"
import { CardAction } from "botbuilder";

import { MongoDbStorage } from "botbuilder-mongodb-storage"



var builder = require('botbuilder');
var connector = new LineConnector({
    hasPushApi: false, //you to pay for push api >.,<
    // your line
    channelId: process.env.channelId || "1487202031",
    channelSecret: process.env.channelSecret || "64078989ba8249519163b052eca6bc58",
    channelAccessToken: process.env.channelAccessToken || "QELaTKb+JpKNt+LndfixVD8EA+DGID5wgvZ10skM3F2nPPzvTC7ZpvxQ3onkR+hu06eRv1S+NG6Cfyw3EtfW21K6x6RGBRqf8ehPYUalja77myU10cSBR9GmYA/HDri9jDg5YqDHUVg5JCrkb+nnygdB04t89/1O/w1cDnyilFU="
});
// var connector = new builder.ConsoleConnector().listen();

var bot = new builder.UniversalBot(connector)
    .set("storage", new MongoDbStorage({
        DatabaseName: "abc123456",
        collectionName: "botState",
        mongoIp: "127.0.0.1",
        mongoPort: "27017",
        // mongoIp: "ds125578.mlab.com",
        // mongoPort: "255xx",
        // username: "myUserAdmin",
        // password: "testtest123"
    }));



bot.use(builder.Middleware.dialogVersion({ version: 3.0, resetCommand: /^reset/i }));

bot.dialog("/", [
    s => { builder.Prompts.text(s, "name?") },
    (s, r) => {
        s.userData.name = r.response;
        console.log("after name", s.userData)
        builder.Prompts.number(s, "age?")
    },
    (s, r) => {
        console.log("after age", s.userData)

        s.userData.age = r.response

        s.endDialog("bady " + s.userData.name)
    }

])


export const line: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    console.log("line begin")
    connector.serverlessWebhock(event)
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         message: 'ok!',
    //         input: event,
    //     }),
    // };
    // cb(null, response);
}



// export const line: Handler = serverless(server);
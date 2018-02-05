import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { LineConnector, Sticker, Location } from "botbuilder-linebot-connector"
import { CardAction } from "botbuilder";

var builder = require('botbuilder');

var connector = new LineConnector({
    hasPushApi: false, //you to pay for push api >.,<
    // your line
    channelId: process.env.channelId || "",
    channelSecret: process.env.channelSecret || "",
    channelAccessToken: process.env.channelAccessToken || ""
});

var bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    s => {s.send("hello")}
]
)

export const line: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    console.log("line begin")
    connector.serverlessWebhock(event)
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'ok!',
            input: event,
        }),
    };
    cb(null, response);
}



// export const line: Handler = serverless(server);
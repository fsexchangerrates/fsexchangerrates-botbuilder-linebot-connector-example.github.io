"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var botbuilder_linebot_connector_1 = require("botbuilder-linebot-connector");
var botbuilder_mongodb_storage_1 = require("botbuilder-mongodb-storage");
var builder = require('botbuilder');
var connector = new botbuilder_linebot_connector_1.LineConnector({
    hasPushApi: false,
    // your line
    channelId: process.env.channelId || "1487202031",
    channelSecret: process.env.channelSecret || "64078989ba8249519163b052eca6bc58",
    channelAccessToken: process.env.channelAccessToken || "QELaTKb+JpKNt+LndfixVD8EA+DGID5wgvZ10skM3F2nPPzvTC7ZpvxQ3onkR+hu06eRv1S+NG6Cfyw3EtfW21K6x6RGBRqf8ehPYUalja77myU10cSBR9GmYA/HDri9jDg5YqDHUVg5JCrkb+nnygdB04t89/1O/w1cDnyilFU="
});
// var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector)
    .set("storage", new botbuilder_mongodb_storage_1.MongoDbStorage({
    DatabaseName: "abc123456",
    collectionName: "botState",
    mongoIp: "127.0.0.1",
    mongoPort: "27017",
}));
bot.use(builder.Middleware.dialogVersion({ version: 3.0, resetCommand: /^reset/i }));
bot.dialog("/", [
    function (s) { builder.Prompts.text(s, "name?"); },
    function (s, r) {
        s.userData.name = r.response;
        console.log("after name", s.userData);
        builder.Prompts.number(s, "age?");
    },
    function (s, r) {
        console.log("after age", s.userData);
        s.userData.age = r.response;
        s.endDialog("bady " + s.userData.name);
    }
]);
exports.line = function (event, context, cb) {
    console.log("line begin");
    connector.serverlessWebhock(event);
    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         message: 'ok!',
    //         input: event,
    //     }),
    // };
    // cb(null, response);
};
// export const line: Handler = serverless(server); 
//# sourceMappingURL=handler.js.map
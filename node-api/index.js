const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: true,
  origins: ["http://127.0.0.1:5347"],
});

const kafka = require("kafka-node");

Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
consumer = new Consumer(client, [{ topic: "quickstart-events" }], {
  autoCommit: false,
});

var newValueProduct = "";
consumer.on("message", function (message) {
  io.emit("message", Math.floor(message.value));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

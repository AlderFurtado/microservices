var kafka = require("kafka-node");
Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({ kafkaHost: "kafka:9092" });
consumer = new Consumer(client, [{ topic: "quickstart-events" }], {
  autoCommit: false,
});

consumer.on("message", function (message) {
  console.log(message);
});

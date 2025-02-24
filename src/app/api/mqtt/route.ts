import { NextRequest } from "next/server";
import { EventEmitter } from "events";
import mqtt from "mqtt";

const eventEmitter = new EventEmitter();

const mqttBrokerUrl = process.env.MQTT_BROKER_URL!;
const MQTT_TOPIC = "my/topic";

const client = mqtt.connect(mqttBrokerUrl);

client.on("connect", () => {
  console.log(`Connected to MQTT broker at ${mqttBrokerUrl}`);
  client.subscribe(MQTT_TOPIC, (err) => {
    if (!err) {
      console.log(`Subscribed to topic: ${MQTT_TOPIC}`);
    } else {
      console.error("Subscription error:", err);
    }
  });
});

client.on("message", (topic, message) => {
  console.log(`Received message on ${topic}: ${message.toString()}`);
  eventEmitter.emit("newMessage", message.toString());
});

client.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

export async function GET(req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const onMessage = (msg: string) => {
        controller.enqueue(`data: ${msg}\n\n`);
      };

      eventEmitter.on("newMessage", onMessage);

      req.signal.addEventListener("abort", () => {
        eventEmitter.off("newMessage", onMessage);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

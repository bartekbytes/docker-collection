// Simple Kafka consumer for Debezium PostgreSQL topics
// Usage: configure BROKERS and TOPIC via env vars

const { Kafka } = require('kafkajs');

const brokers = (process.env.BROKERS || 'kafka:9092').split(',');
const topic = process.env.TOPIC || 'postgres.cdc.public.customers';
const groupId = process.env.GROUP_ID || 'cdc-node-group';

const kafka = new Kafka({
  clientId: 'cdc-node-client',
  brokers
});

const consumer = kafka.consumer({ groupId });

async function run() {
  await consumer.connect();
  console.log(`Connected to Kafka brokers: ${brokers.join(',')}`);
  await consumer.subscribe({ topic, fromBeginning: true });
  console.log(`Subscribed to topic: ${topic}`);

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const value = message.value?.toString();
        if (!value) {
          console.log('[tombstone] key=', message.key?.toString() || null);
          return;
        }

        // Debezium default payload contains "before", "after", "op", etc.
        let parsed;
        try {
          parsed = JSON.parse(value);
        } catch (e) {
          console.log('[raw] ', value);
          return;
        }

        // If connector uses ExtractNewRecordState SMT, "after" is lifted:
        // - unwrapped form has the record fields at top-level
        // Detect common shapes:
        if (parsed.after || parsed.before || parsed.op) {
          // full Debezium envelope
          console.log('--- Debezium envelope ---');
          console.log('op:', parsed.op);
          console.log('before:', parsed.before);
          console.log('after:', parsed.after);
        } else {
          // likely unwrapped: directly the row
          console.log('--- Unwrapped record (ExtractNewRecordState) ---');
          console.log(parsed);
        }
      } catch (err) {
        console.error('Error processing message:', err);
      }
    }
  });
}

run().catch(err => {
  console.error('Consumer failed', err);
  process.exit(1);
});

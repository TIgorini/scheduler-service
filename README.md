# scheduler-service
Little util for scheduling with producer and consumer services.

## Setup

Required:
 - running MongoDB
 - running RabbitMQ

Setup commands:
```
npm ci
npm build
```

## Launch

Launch producer service
```
npm run start:producer
```
Launch consumer service
```
npm run start:consumer
```
Use cli to schedule jobs
```
npm run schedule <delay> <message>
```
- delay - delay in minutes to schedule job. 
- message - type of scheduled job. Can be `fairies`, `gnomes`, `unicorns`.

### Example

Schedule "unicorns" job to be executed in 5 minutes from now.
```
npm run schedule 5 "unicorns"
```
See output in consumer service after that time:
```
[datetime after 5 minutes] Unicorns occupied your console.
```


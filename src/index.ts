import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { timing } from 'hono/timing';

const app = new Hono();
app.use('*', logger());
app.use('*', timing());
console.log(Bun.env.TEST);
console.log(Bun.env.AI);

app.get('/', c => {
  return c.json({ message: 'Hello, Hono!' });
});

export default app;

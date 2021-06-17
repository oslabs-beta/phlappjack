import { Application } from './deps.ts'
  import { router } from './router/routes.ts'
  
const app = new Application();
const port: number = 3000;

app.use(router.routes());
app.use(router.allowedMethods());
app.listen({ port });
  
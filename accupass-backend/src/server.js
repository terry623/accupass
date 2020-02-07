const logger = require('koa-logger');
const router = require('koa-router')();
const Koa = require('koa');
const cors = require('@koa/cors');
const api = require('./api.js');

const port = 8080;
const app = new Koa();

app.use(cors());

app.use(logger());

router.get('/categories', async ctx => {
  const { data } = await api.getCategories();
  ctx.set('Cache-Control', 'max-age=31536000');
  ctx.body = JSON.stringify(data || {});
});

router.get('/categories/:categoryIds/:page', async ctx => {
  const { categoryIds, page } = ctx.params;
  const { data } = await api.getAttractions({ categoryIds, page });
  ctx.set('Cache-Control', 'max-age=31536000');
  ctx.body = JSON.stringify(data || {});
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}...`);
});

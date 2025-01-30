const proxy = [
  {
    context: '/ged/api',
    target: 'http://localhost:8081',
    pathRewrite: {'^/ged/api' : ''}
  }
];
module.exports = proxy;

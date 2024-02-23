'use strict';

const prependLocaleToPath = process.env.PREPEND_LOCALE_TO_PATH === 'true';
const prependSiteIdToPath = process.env.PREPEND_SITEID_TO_PATH === 'true';

const routes = [
  { path: '/product/:productId' },
  { path: '/search' },
  { path: '/category/:categoryId' },
  { path: '/__mrt/hmr'},
  { path: '/worker.js'}
];

const PWA_ROUTES = [
  {
    path: '/callback'
  }
];

// add :locale and :siteId path to routes (RefArch/en-US)
const prependPath = [];
if (prependSiteIdToPath) {
  prependPath.push(':siteId');
}
if (prependLocaleToPath) {
  PWA_ROUTES.push({
    path: '/:locale',
    exact: true
  });
  prependPath.push(':locale');
}
if (prependPath.length) {
  PWA_ROUTES.push({
    path: `/${prependPath.join('/')}`,
    exact: true
  });
}

for (let i = 0; i < routes.length; i++) {
  let route = routes[i];
  PWA_ROUTES.push(route);

  // add :locale and :siteId path to routes
  if (prependPath.length) {
    PWA_ROUTES.push({ path: `/${prependPath.join('/')}${route.path}` });
  }
}

module.exports = PWA_ROUTES;

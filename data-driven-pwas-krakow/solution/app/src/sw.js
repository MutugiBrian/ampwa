importScripts('workbox-sw.prod.v1.1.0.js');
importScripts('workbox-background-sync.prod.v1.2.0.js');

const workboxSW = new WorkboxSW();
workboxSW.precache([]);

workboxSW.router.registerRoute('/api/getAll',
  function() {
    console.log('done');
    return bgQueue.replayRequests().then(() => {
      return fetch('/api/getAll');
    }).catch((err) => {
      console.log(err); // throw
    });
  }
);

let bgQueue = new workbox.backgroundSync.QueuePlugin({
  callbacks: {
    replayDidSucceed: async(hash, res) => {
      self.registration.showNotification('Background sync demo', {
        body: 'HEEYYYY'
      });
    }
  }
});

workboxSW.router.registerRoute('/api/add',
  workboxSW.strategies.networkOnly({plugins: [bgQueue]}),
  'POST'
);

self.addEventListener('message', event => {
  console.log(event);
  bgQueue.replayRequests();
});
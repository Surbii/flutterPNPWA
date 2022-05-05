importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js");
firebase.initializeApp({
     apiKey: "AIzaSyDwp0G7NdKXTkJxh2R93HGi-3tsD2hKf3A",
        authDomain: "autotp-demo.firebaseapp.com",
        projectId: "autotp-demo",
        storageBucket: "autotp-demo.appspot.com",
        messagingSenderId: "1088371224450",
        appId: "1:1088371224450:web:6434c1ebf5e4568190699b",
        measurementId: "G-VZ4ZL49D6G"
    });
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
        })
        .then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                windowClient.postMessage(payload);
            }
        })
        .then(() => {
            return registration.showNotification("New Message");
        });
    return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
    console.log('notification received: ', event)
});
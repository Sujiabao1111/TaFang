window.addEventListener("message", ({ data }) => {
  const pdData = data?.playdeck;
  if (!pdData) return;

  console.log("[game 🎾 :]", pdData.method, pdData.value);

  if (pdData.method === 'getPlaydeckState') {
    window.playdeckIsOpen = pdData.value;
  }

  if (pdData.method === "getUser" || pdData.method === "getUserProfile") {
    window.playdeckUser = pdData.value;
  }
  

  if (pdData.method === "getUserLocale") {
    window.playdeckUserLocale = pdData.value;
  }

  if (pdData.method === "getScore") window.playdeckScore = pdData.value;

  if (pdData.method === "getData") {
    window.playdeckData = pdData.value;
  }

  if (pdData.method === "play") {
    // if (runner.crashed && runner.gameOverPanel) {
    //   runner.restart();
    // } else {
    //   var e = new KeyboardEvent("keydown", { keyCode: 32, which: 32 });
    //   document.dispatchEvent(e);
    // }
  }

  if (pdData.method === "pause") {
    // runner.stop();
  }
  if (pdData.method === 'getToken') {
    // console.log(pdData.value); // { token: '123456789...' }
  }

  if (pdData.method === 'requestPayment') {
    // console.log(pdData.value); // { url: 'https://t.me/$XIVLvBpfOEsBBwAARs....' } // payment link
    // pdData.value.url
    Playdeck_openTelegramLink(pdData.value.url)
  }

  if (pdData.method === 'invoiceClosed') {
    console.log(pdData.value); // { status: 'paid' | 'cancelled' | 'failed' | 'pending' }

    window.invoiceClosedCallback(pdData.value.status)
    if (pdData.value.status === 'paid') {
      //付款成功
    } else {
      //付款失败
    }
  }

  if (pdData.method === 'rewardedAd') {
    console.log(pdData.value); // user has been watched ad
    if (window.playdeckShowAdCallback) {
      window.playdeckShowAdCallback(1)
    }
  }
  if (pdData.method === 'errAd') {
    console.log(pdData.value); // something went wrong at advert provider
    window.playdeckShowAdCallback(2)
  }
  if (pdData.method === 'skipAd') {
    console.log(pdData.value); // user has been skip ad
  }
  if (pdData.method === 'notFoundAd') {
    console.log(playdeck.value); // advert provider doesn't return any ad
  }
  if (pdData.method === 'startAd') {
    console.log(pdData.value); // user has been started watching ad
  }
});

const playDeckParent = window.parent.window;

const Playdeck_loading = (value) =>
  playDeckParent.postMessage({ playdeck: { method: "loading", value: value } }, "*");

const Playdeck_getPlaydeckState = (value) =>
  playDeckParent.postMessage({ playdeck: { method: "getPlaydeckState" } }, "*");

const Playdeck_getToken = () => {
  playDeckParent.postMessage({ playdeck: { method: 'getToken' } }, '*');
}

const Playdeck_getScore = () =>
  playDeckParent.postMessage({ playdeck: { method: "getScore" } }, "*");

const Playdeck_setScore = (value, isForce = false) =>
  playDeckParent.postMessage(
    { playdeck: { method: "setScore", value: value, isForce: isForce } },
    "*"
  );

const Playdeck_getData = (key) =>
  playDeckParent.postMessage({ playdeck: { method: "getData", key: key } }, "*");
const Playdeck_setData = (key, value) =>
  playDeckParent.postMessage(
    { playdeck: { method: "setData", key: key, value: value } },
    "*"
  );

const Playdeck_getUserLocale = () =>
  playDeckParent.postMessage({ playdeck: { method: "getUserLocale" } }, "*");
const Playdeck_getUser = () =>
  playDeckParent.postMessage({ playdeck: { method: "getUser" } }, "*");

const Playdeck_getUserProfile = () =>
  playDeckParent.postMessage({ playdeck: { method: "getUserProfile" } }, "*");

const Playdeck_gameEnd = () =>
  playDeckParent.postMessage({ playdeck: { method: "gameEnd" } }, "*");

const Playdeck_requestPayment = (amount, desc, orderId) => {
  playDeckParent.postMessage(
    {
      playdeck: {
        method: "requestPayment", value: {
          amount: amount,
          description: desc,
          externalId: orderId
        }
      }
    },
    "*"
  );
}

const Playdeck_showAd = () => {
  playDeckParent.postMessage({ playdeck: { method: "showAd" } }, '*');
}

const Playdeck_openTelegramLink = (url) => {
  playDeckParent.postMessage({ playdeck: { method: "openTelegramLink", value: url } }, '*');
}

console.log("=====================playdeck init")
Playdeck_getPlaydeckState()
Playdeck_loading()
setTimeout(() => {
  Playdeck_loading(100)
}, 1000)
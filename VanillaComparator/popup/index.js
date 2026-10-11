import { amazonObjectBuilder } from "./utils/amazon-object-builder.js";
import { storeDataIntoLocalStorage } from "./utils/store-data-into-localStorage.js";
import { printData } from "./scripts/print-data.js";

navigator.serviceWorker.addEventListener("message", (event) => {
  readServiceWorkerData(event.data);
});

(() => {
  chrome.runtime.sendMessage('get-data-tabs').then(response => {
    if (!response) {
      return;
    }

    const tabData = JSON.parse(response);

    readServiceWorkerData(tabData);
    printData()
  })
})()

function readServiceWorkerData(tabData) {
  tabData.forEach(tb => {
    const domain = tb.domain;
    const data = tb.result;
    const status = tb.status;
    const price = tb.price;
    if (domain.includes("amazon")) {
      storageAmazonData({ domain, data, status, price });
    }
  })
}

function storageAmazonData({ domain, data, status, price }) {
  const amazonData = amazonObjectBuilder({ data, status });

  if (amazonData.length === 0) {
    return;
  }

  amazonData.push({
    fieldName: "price",
    content: price
  });
  
  storeDataIntoLocalStorage({ domain, domainData: amazonData, status })
}
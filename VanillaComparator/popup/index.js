import { amazonObjectBuilder } from "./utils/amazon-object-builder.js";
import { storeDataIntoLocalStorage } from "./utils/store-data-into-localStorage.js";
import { printData } from "./scripts/print-data.js";

(() => {
  chrome.runtime.sendMessage('get-data-tabs').then(response => {
    if (!response) {
      return;
    }

    const tabData = JSON.parse(response);

    tabData.forEach(tb => {
      const domain = tb.domain;
      const data = tb.result;
      const status = tb.status;

      if (domain.includes("amazon")) {
        storageAmazonData({ domain, data, status });
      }
    })
    printData()
  })

  chrome.storage.onChanged.addListener((changes, namespace) => {
    console.log("changes", changes)
  })


})()
function storageAmazonData({ domain, data, status }) {

  const amazonData = amazonObjectBuilder({ data, status });

  if (amazonData.length === 0) {
    return;
  }

  storeDataIntoLocalStorage({ domain, domainData: amazonData, status })
}
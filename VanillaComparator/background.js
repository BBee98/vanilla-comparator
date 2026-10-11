const includedUrls = ["amazon"]

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.includes('get-data-tabs')) {
    const result = await fetchTabs();
    sendResponse(JSON.stringify(result))
  }
})

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tabIsLoaingOrComplete(changeInfo.status)) {
    const index = includedUrls.findIndex(url => tab.url.includes(url));
    if (index !== -1) {
      await postMessageToClient();
    }
  }
})

async function postMessageToClient() {
  const result = await fetchTabs();
  const allClients = await self.clients.matchAll();
  for (const client of allClients) {
    client?.postMessage(result);
  }
}

async function fetchTabs() {
  const tabs = await chrome.tabs.query({});
  const promisedResult = tabs.map(async (tab) => {
    const index = includedUrls.findIndex(url => tab.url.includes(url));
    if (index !== -1 && tabIsLoaingOrComplete(tab.status)) {
      try {
        const result = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["script-amazon.js"],
        });

        const _result = (Array.isArray(result) ? result[0] : result)?.result;

        if (!_result.productInfo) {
          return null;
        }
        return {
          domain: includedUrls[index],
          result: _result?.productInfo,
          price: _result.price,
          status: tab.status
        }
      } catch (error) {
        console.error("Something bad happened", error)
      }
    }
    return null;
  }).filter(Boolean)
  const resolved = await Promise.all(promisedResult)
  return resolved.filter(Boolean);
}

function tabIsLoaingOrComplete(status) {
  return status === 'complete' || status === 'loading'
}
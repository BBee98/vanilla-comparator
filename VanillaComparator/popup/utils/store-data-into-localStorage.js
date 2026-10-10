export function storeDataIntoLocalStorage({ domain, domainData, status }) {

    const arrayData = JSON.parse(localStorage.getItem("data"));

    const itemJSONData = {
        data: domainData,
        domain,
        status
    }

    const isFirstTime = !arrayData || arrayData?.length === 0;
    if (isFirstTime) {
        localStorage.setItem("data", JSON.stringify([itemJSONData]))
        return;
    }

    const dataIsAlreadyIn = arrayData.find(item => JSON.stringify(item).includes(JSON.stringify(itemJSONData)))

    if (!dataIsAlreadyIn) {
        arrayData.push(itemJSONData);
        localStorage.setItem("data", JSON.stringify(arrayData))
    }

}

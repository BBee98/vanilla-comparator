function fetchToTable(table) {
  const data = []
  const rows = table?.querySelectorAll("tr");
  rows.forEach((row) => {
    const titleCell = row.querySelector("th").innerHTML;
    const contentCell = row.querySelector("td").innerHTML;
    data.push({
      fieldName: titleCell,
      content: contentCell
    })
  })
  return data;
}

function getChildrenFromTable(element) {
  if (!element) {
    return []
  }
  const innerElementSection = element.querySelector(".a-section");
  const productDetailTable = innerElementSection.querySelector(".prodDetTable").children[0];
  return productDetailTable
}

function getChildrenFromSections(rightSection, leftSection) {
  const contentTable = rightSection?.children[0];
  const dimensionsTable = rightSection?.children[1];
  const informationProductTable = leftSection?.children[0];
  const specificationsTable = leftSection?.children[1];

  return {
    contentTable,
    dimensionsTable,
    informationProductTable,
    specificationsTable
  }
}

(() => {
  const rightSection = document.querySelector("#productDetails_expanderTables_depthRightSections");
  const leftSection = document.querySelector("#productDetails_expanderTables_depthLeftSections");

  const { contentTable, dimensionsTable, informationProductTable, specificationsTable } = getChildrenFromSections(rightSection, leftSection)

  return [contentTable, dimensionsTable, informationProductTable, specificationsTable].map(tables => fetchToTable(getChildrenFromTable(tables)))[0]
})()

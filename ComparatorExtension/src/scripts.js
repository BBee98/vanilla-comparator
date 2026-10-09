export const clickTabEvent = async() => {
  console.log("chrome", chrome);
  const isEnabled = await chrome.action.isEnabled();
  console.log('isEnabled', isEnabled);
}
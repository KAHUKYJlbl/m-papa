import type { PlasmoMessaging } from "@plasmohq/messaging"

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };

  let [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

const handler: PlasmoMessaging.PortHandler = async (_, res) => {
  let url: string;

  getCurrentTab()
    .then((tab) => url = tab.url);

  res.send({
    message: url
  })
}

export default handler
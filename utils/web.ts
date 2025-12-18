import * as WebBrowser from "expo-web-browser";

export async function openExternalLink(url: string) {
  await WebBrowser.openBrowserAsync(url);
}

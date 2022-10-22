import * as dotenv from "dotenv";

dotenv.config();

export default {
  name: "ysc-mobile",
  slug: "ysc-mobile",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  splash: {
    image: "./assets/YStemLogo.png",
    resizeMode: "contain",
    backgroundColor: "#D4DDDD",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    YSC_SERVER_URI: "https://ystemandchess.com/middleware/",
    SOCKET_URI: process.env.SOCKET_URI || "http://localhost:3000",
  },
};

import 'dotenv/config';
export default {
  "expo": {
    "name": "Paw-Mate",
    "slug": "paw-mate",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "newArchEnabled": true,
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#F8F9FA"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "edgeToEdgeEnabled": true,
      "package": "com.anonymous.pawmate"
    },
    "extra": {
      reqresApiKey: process.env.REQRES_API_KEY
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}

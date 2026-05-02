# Jo mai mai

![App Screenshot](https://github.com/Ericriera/MyPortfolio/blob/main/img/jomaimai.png)

This is a fun mobile application built with [Expo](https://expo.dev/) and React Native, based on the popular game "Never Have I Ever". The app is designed to be played in a group setting, encouraging players to share experiences in a lighthearted way. The app is designed to be cross-platform and works on both iOS and Android devices and on [web](https://jomaimai.netlify.app/) (recomended to play on mobile devices). 

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20.19+ (LTS)
- npm

> Note: this project uses the local Expo CLI workflow (`npx expo ...`).

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/Jo-mai-mai.git
    ```

2. Navigate to the project directory:

    ```bash
    cd MyExpoApp
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Running the App

1. Start the Expo development server with the local CLI bundled in the project:

    ```bash
    npm run start
    ```

2. Open the Expo Go app on your mobile device (available on [iOS](https://apps.apple.com/app/apple-store/id982107779) and [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)).

3. Scan the QR code generated in your terminal or web browser to run the app on your device.

Useful commands:

```bash
npm run android
npm run ios
npm run web
npm run doctor
```

### Building the App

To build the app for distribution (Android/iOS), run the following command:

```bash
eas build
```

> **Note:** You will need an Expo account and [Expo Application Services (EAS)](https://docs.expo.dev/eas/) to build the app for production.

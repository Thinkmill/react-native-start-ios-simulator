# React Native Start iOS Simulator
Start a React Native app in the iOS simulator of your choice

```zsh
➜  MyApp git:(main) ✗ yarn ios
yarn run v1.22.10
$ run-ios
? Pick a Simulator › - Use arrow-keys. Return to submit.
    iPhone 5s
❯   iPhone 6 Plus
    UDID: E7D75ACD-3F89-4C9A-A1BF-5AA942725E98.
    iPhone 6
    iPhone 6s
    iPhone 6s Plus
    iPhone SE (1st generation)
    iPhone 7
    iPhone 7 Plus
    iPhone 8
  ↓ iPhone 8 Plus
```

## Getting Started
1. Install from NPM
```
npm install react-native-ios-start-sim
// or
yarn add react-native-ios-start-sim
```

2. Replace your iOS script

```json
{
  "name": "My-React-Native-App",
  "scripts": {
    "ios":"start-ios-sim"
  },
  "dependencies": {
    "react-native-start-ios-sim": "^1.0.0"
  }
}
```

3. Run `yarn ios`

## Using schemes
If your app uses schemes to configure environments, you can specify what scheme is started in the CLI command

```json
{
  "name": "My-React-Native-App",
  "scripts": {
    "ios": "start-ios-sim --scheme='Development'",
  }
}
```


## Publishing

We version this package by updating the CHANGELOG.md file, and using the npm version commands...

- `npm version patch`
- `npm version minor`
- `npm version major`

 We then publish to NPM using `npm publish`.

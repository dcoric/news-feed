## Setting up the project

First step is to set `.env` file in app root with current values:
```
SASS_PATH=./node_modules;./src
HTTPS=true
PORT=8443
REACT_APP_API_KEY=ENTER_YOUR_API_KEY_HEY_HERE
```

*PORT* is optional
*REACT_APP_API_KEY* can be obtained from [newsapi.org](https://newsapi.org/register)

## Setting dark theme

The application has both a dark and light web theme. Switch within the user interface is left as TODO,
but it can be manually selected in index.html by changing::
 
 `<body class="theme-light">` to `<body class="theme-dark">`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [https://localhost:8443](https://localhost:8443) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

### `yarn lint`

Performs lint check. Lint rules are defined in the github repo [dcoric/eslint-config-groundlink](https://github.com/dcoric/eslint-config-groundlink)

Caching is enabled by default so next lint checking are only running across modified files.

### `yarn lint-fix`

This will run check as in `yarn lint` but will auto-fix most of the minor issues like spacings, new lines, missing `;`...

### `yarn storybook`

Starts storybook with components preview

### `yarn build-storybook`

Build storybook as independent application which can be deployed

## API Connections

For communication with external API, axios is used. Since newsapi.org does not have CORS setting allowed for localhost/development,
it is bypassed by using the proxy server: `cors-anywhere.herokuapp.com`

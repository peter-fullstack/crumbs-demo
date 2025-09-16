# React + TypeScript + Vite

This app is a demo for a paginated table. Currently the data is provided through a mock api
passed into the components from main.tsx. This makes the app standalone and testable out of the box 
and without the need to run a back end api. 

The app provides a searchable list with paging but many details have not been addressed.

Still to do:
- The app has not been tested or integrated with the ASP.NET Web Api.
- The modal add book form does not implement a POST to the backend.
- There is no functionality in the UI to set the available property for a book.
- Cleaner CSS and better layout
- Wider range of tests
- Better Mock Api setup and developer experience

Going forward I would provide the same testability using Mock Service Worker (MSW).

```
npm install msw --save-dev
```
Then implement handlers for the different requests. For example for a paged get books request:

```
import { rest } from "msw";

const itemsPage1 = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

const itemsPage2 = [
  { id: 3, name: "Item 3" },
  { id: 4, name: "Item 4" },
];

export const handlers = [
  rest.get("/api/items", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page") || 1);
    const search = req.url.searchParams.get("search") || "";

    let items = page === 1 ? itemsPage1 : itemsPage2;

    if (search) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ items, hasMore: page < 2 })
    );
  }),
];

```
The above would be a better appraoch then the prop-drilled mock api call currently being used.

## To run the app
Use the command line and navigate to the root folder of this application - crumbs-demo

```
npm install
```

Followed by 

```
npm run dev
```

Open the displayed Url in a browser.

## Automated tests

To run all tests in the project use 

```
npx vitest
```

To run a single suite of tests use 

```
npx vitest run src/features/books/BooksPage.mock.test.tsx
```
Further development and testing will be needed to make this application more resilient to change.

## Configuration Options 

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

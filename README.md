## Simple React boiler plate for isomorphic server side rendering
### How to set up
1. Run npm install
2. You are all set up . to run  the development server `npm run dev`
3. Run test `npm test`

Required Node Version >= 6.6.0

### Details and structure
1. eslint airbnb style guide for react application
2. structured source code in the src directory
3. webpack as the transpile tool
4. a pre-commit hook to make sure that all consequent commits for the prescribed style guide are consistent
5. component houses the re-usable component, container houses the pages, helpers for utility functions
6. each component is a self contained module containing it's own scss/css jsx, tests, images
7. same thing applies to module
8. You are free to use whichever statemenet tool you choose be it redux, mobx, reflux flux or whatever
9. Also the route file was intentionally left out.

### Todo
1. production build
2. Integration tools like travis
3. Integrate DevTools and hot reloader

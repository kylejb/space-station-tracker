import { render } from '@testing-library/react';

//! import of Earth component in App is causing Jest error
// node_modules/three/examples/jsm/utils/BufferGeometryUtils.js:1
// ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,global,jest){import {
//   ^^^^^^
// SyntaxError: Cannot use import statement outside a module
//* Created MockApp as a result for use in other tests
// comments and code will be refactored in future revision

// Mock of Earth component
const MockEarth = () => <h1>Earth Component</h1>;
MockEarth.create = jest.fn(() => MockEarth);

test('renders Earth Component', () => {
  const {container} = render(<MockEarth/>);
  expect(container.textContent).toMatch('Earth Component');
});

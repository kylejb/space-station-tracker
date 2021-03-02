const MockApp = () => <>
  <h1>App Component</h1>
  <h1>Search Component</h1>
  <h1>Globe Component</h1>
</>;

MockApp.create = jest.fn(() => MockApp);
export default MockApp;

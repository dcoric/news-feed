class URLGenerator {
  constructor (url) {
    this.url = url;
  }

  setParameter (parameter, value) {
    this.url.replace(parameter, value);
    return this;
  }

  generateUrl () {
    return this.url;
  }
}

export default URLGenerator;

export {
  URLGenerator
};

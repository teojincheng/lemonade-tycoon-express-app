class Customer {
  constructor() {
    this._imageSrc = "";
  }

  set imageSrc(src) {
    this._imageSrc = src;
  }
}

module.exports = Customer;

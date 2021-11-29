export default class Store {
  constructor (key, storage) {
    this._storage = storage;
    this._storekey = key;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storekey)) || {};
    }
    catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(this._storekey, JSON.stringify(items));
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
      this._storekey,
      JSON.stringify(Object.assign({}, store, {[key]: value})),
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(this._storekey, JSON.stringify(store));
  }
}

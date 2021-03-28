class Cache {
  storeItem(key: string, value: {}, expiry: number) {
    const d = new Date();
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const day = d.getUTCDate();

    const startHour = Date.UTC(year, month, day, 0, 0, 0, 0);
    const endHour = startHour + 86400000;

    const data = {
      value: value,
      expiry: endHour * expiry,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item).value : null;
  }

  removeExpiredItem(key: string) {
    const item = localStorage.getItem(key);
    const expiry = item ? JSON.parse(item).expiry : null;
    const date = new Date();

    if (expiry && date.getTime() > expiry) {
      localStorage.removeItem(key);
    }
  }
}

export default new Cache();

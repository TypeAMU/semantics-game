export function createCache({ ttl = null, persistKey = null } = {}) {
  const cache = new Map();
  const pending = new Map();

  function loadFromStorage() {
    if (!persistKey) return;
    try {
      const raw = localStorage.getItem(persistKey);
      if (!raw) return;
      const entries = JSON.parse(raw);
      const now = Date.now();
      for (const [key, { value, ts }] of entries) {
        if (!ttl || now - ts < ttl) {
          cache.set(key, { value, ts });
        }
      }
    } catch {
      // corrupted storage — ignore
    }
  }

  function saveToStorage() {
    if (!persistKey) return;
    try {
      localStorage.setItem(persistKey, JSON.stringify([...cache.entries()]));
    } catch {
      // storage full or unavailable — ignore
    }
  }

  function has(key) {
    if (!cache.has(key)) return false;
    if (ttl && Date.now() - cache.get(key).ts >= ttl) {
      cache.delete(key);
      return false;
    }
    return true;
  }

  function get(key) {
    if (!has(key)) return undefined;
    return cache.get(key).value;
  }

  function set(key, value) {
    cache.set(key, { value, ts: Date.now() });
    saveToStorage();
  }

  async function getOrFetch(key, fetchFn) {
    if (has(key)) return get(key);

    // deduplicate in-flight requests
    if (pending.has(key)) return pending.get(key);

    const promise = fetchFn(key).then((value) => {
      set(key, value);
      pending.delete(key);
      return value;
    }).catch((err) => {
      pending.delete(key);
      throw err;
    });

    pending.set(key, promise);
    return promise;
  }

  loadFromStorage();

  return { has, get, set, getOrFetch };
}

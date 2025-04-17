//custom hook
export function useLocalStorage(key) {
  const setItem = (value) => {
    try {
      if (!value || typeof value !== "object") {
        throw new Error("Value must be a valid object.");
      }

      const existingItems = JSON.parse(localStorage.getItem(key)) || [];
      existingItems.push(value);
      localStorage.setItem(key, JSON.stringify(existingItems));
    } catch (err) {
      console.error(`Error setting item in LocalStorage: ${err.message}`);
    }
  };

  const getItem = () => {
    try {
      const items = JSON.parse(localStorage.getItem(key));
      return items || [];
    } catch (err) {
      console.error(`Error getting items from LocalStorage: ${err.message}`);
      return [];
    }
  };

  const removeItem = (index) => {
    try {
      const items = JSON.parse(localStorage.getItem(key)) || [];
      items.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(items));
    } catch (err) {
      console.error(`Error removing item from LocalStorage: ${err.message}`);
    }
  };

  return { setItem, getItem, removeItem };
}

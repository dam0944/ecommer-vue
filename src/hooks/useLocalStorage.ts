import { ref,type Ref, watch } from 'vue'
export function useLocalStorage<T>(key: string, defaultValue: T): {
  storedValue: Ref<T>;
  setItem: (value: T) => void;
  getItem: () => T;
  removeItem: () => void;
} {
  // Try to read existing value from localStorage
  const raw = localStorage.getItem(key)
  const parsed: T = raw !== null
    ? JSON.parse(raw)
    : defaultValue

  // Cast to Ref<T> so our return type lines up
  const storedValue = ref(parsed) as Ref<T>

  // Whenever storedValue changes, sync back to localStorage
  watch(
    storedValue,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val))
    },
    { deep: true }
  )

  function setItem(value: T) {
    storedValue.value = value
  }

  function getItem(): T {
    return storedValue.value
  }

  function removeItem() {
    localStorage.removeItem(key)
    storedValue.value = defaultValue
  }

  return { storedValue, setItem, getItem, removeItem }
}

import { useState, useEffect } from "react"

/**
 * Returns a value that updates only after `delayMs` have passed without `value` changing.
 * Useful for search boxes so the app waits until the user pauses typing before calling the API.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const id = window.setTimeout(() => setDebouncedValue(value), delayMs)
        return () => window.clearTimeout(id)
    }, [value, delayMs])

    return debouncedValue
}

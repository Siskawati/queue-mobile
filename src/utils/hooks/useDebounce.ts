import { useCallback, useRef } from "react"

export function useDebounce(timeInMs: number) {

    const nodeRef = useRef<NodeJS.Timeout>()

    const timeoutFunction = useCallback((fn: Function) => {
        nodeRef.current = setTimeout(() => {
            clearTimeout(nodeRef.current)
            fn()
        }, timeInMs)
    }, [])

    return timeoutFunction

}

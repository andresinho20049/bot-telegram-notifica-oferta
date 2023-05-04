import { useCallback, useRef } from "react"


export const useDobounce = (delay = 500, delayFistTime = false) => {

    const debouncing = useRef<NodeJS.Timeout>();
    const isFirstTime = useRef(!delayFistTime);

    const debounce = useCallback((func: () => void) => {

        if(isFirstTime.current){
            isFirstTime.current = false;
            func();
            return;
        }

        if(debouncing.current)
            clearTimeout(debouncing.current);

        debouncing.current = setTimeout(() => func(), delay)
    }, [delay])

    return { debounce }
}
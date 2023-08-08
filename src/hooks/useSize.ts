import { useLayoutEffect, useState } from 'react'
import useResizeObserver from '@react-hook/resize-observer'

/**
 * To get size of an element
 * @param target ref of the element
 * @returns size object of the element
 */
const useSize = (target: any) => {
    const [size, setSize] = useState<any>()

    useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    // Where the magic happens
    useResizeObserver(target, (entry) => setSize(entry.contentRect))
    return size
}

export default useSize
import { useState } from "react"

export const useChange = () => {
    const [change, setChange] = useState(false)
    const makeChange = () => setChange(!change)
    return [change, makeChange]
}
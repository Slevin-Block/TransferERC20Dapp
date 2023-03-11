import React from 'react'
import styles from './ClipLink.module.css'
import copy from 'copy-to-clipboard'
import { useRecoilState } from 'recoil'
import { Tooltip } from '../../../contexts/ToolTip/Tooltip'


const ClipLink = ({children, error}) => {
    const [,setAppear] = useRecoilState(Tooltip)
    const handleCopy = (e) => {
        const text = e.target.innerHTML
        copy(text)
        setAppear(true)
    }

    return (
        <button
            className={`${styles.toCopy}
            ${error ? styles.error : ''}`}
            onClick={handleCopy}
        >
            {children}
        </button>
    )
}

export default ClipLink
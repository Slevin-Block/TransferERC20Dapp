import React from 'react'
import styles from './ClipLink.module.css'
import copy from 'copy-to-clipboard'


const ClipLink = ({children, error}) => {
    const handleCopy = (e) => {
        const text = e.target.innerHTML
        copy(text)
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
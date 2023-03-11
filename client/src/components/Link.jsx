import React from 'react'
import styles from './Link.module.css'
import copy from 'copy-to-clipboard'


const Link = ({children, error}) => {
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

export default Link
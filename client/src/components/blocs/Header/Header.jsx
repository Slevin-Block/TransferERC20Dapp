import React from 'react'
import Tooltip from '../../atoms/Tooltip/Tooltip'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
                <Tooltip/>
                <h1>TRANSFERER VOS ERC20</h1>
        </div>
    )
}

export default Header
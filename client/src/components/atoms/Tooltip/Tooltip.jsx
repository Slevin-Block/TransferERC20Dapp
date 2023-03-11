import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { Tooltip as TooltipState} from '../../../contexts/ToolTip/Tooltip'
import styles from './Tooltip.module.css'

const Tooltip = () => {
    const [appear, setAppear] = useRecoilState(TooltipState)

    useEffect(() => {
        let timeoutID
        if (appear){
            timeoutID = setTimeout(() =>{setAppear(false)}, 3000)
        }
        return () => {clearTimeout(timeoutID)}
    }, [appear])

    return (
        <div className={styles.container}>
            {appear && <div className={styles.message}>Copier</div>}
        </div>
    )
}

export default Tooltip
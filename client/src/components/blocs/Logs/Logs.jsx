import React, { useEffect, useState } from 'react'
import { researchEvent, useRxWeb3, watchingEvents } from '../../../contexts/RxWeb3';
import ClipLink from '../../atoms/ClipLink/ClipLink'
import styles from './Logs.module.css'



const Logs = () => {
    const {isReady, blockNumber} = useRxWeb3()  // Hook RxWeb3
    const [logs, setLogs] = useState([])        // Tous les logs
    const [newLog, setNewLog] = useState(null)  // Le dernier log

    // Pour récupérer les anciens logs et pour s'abonner à l'arrivée de nouveaux
    useEffect(() => {
        if (isReady){
            // Récupération des anciens logs
            handleOldTransaction()

            // Abonnement aux nouveaux logs
            watchingEvents('transaction', setNewLog)
        }
    }, [isReady])

    // Pour fusionner les logs quand un nouveau arrive
    useEffect(() =>{ newLog && setLogs([newLog, ...logs]) }, [newLog])
    
    function handleOldTransaction () {
        const cb = (logs) => {
                setLogs(logs.reverse().map(log => {
                    return {
                                from : log.returnValues.from,
                                to : log.returnValues.to,
                                value : log.returnValues.value
                            }
                }))
            }
        researchEvent('transaction', cb, blockNumber)
    }

    return (
        <div className={styles.logs}>
            <div className={styles.title}>
                <h2>Logs des transactions</h2>
                <p className={styles.logCounter}>{logs.length}</p>
            </div>
            <div className={styles.listLogs}>
            {
                logs.length > 0 &&
                    logs.map((log, i) =>
                        <div key={i} className={styles.logItem}>
                            <ClipLink>{log.from}</ClipLink>
                            <p>{'=>'}</p>
                            <ClipLink>{log.to}</ClipLink>
                            <ClipLink className={styles.value}>{log.value}</ClipLink>
                        </div>
                    )
            }
            </div>

        </div>
    )
}

export default Logs
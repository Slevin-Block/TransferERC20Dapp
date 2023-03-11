import React, { useEffect, useState } from 'react'
import { useEth } from "../../../contexts/EthContext";
import ClipLink from '../../atoms/ClipLink/ClipLink'
import styles from './Logs.module.css'

const Logs = ({change}) => {

    const { state: { contract, accounts } } = useEth();
    const [logs, setLogs] = useState([])

    const check = async () => {
        const events = await contract.getPastEvents('transaction', { fromBlock: 0, toBlock: 'latest' })
        setLogs(events.reverse().map(event => {
            return {
                    from : event.returnValues.from,
                    to : event.returnValues.to,
                    value : event.returnValues.value,
            }
        }))
    }

    useEffect(() =>{ accounts && check() }, [accounts, change])

    return (
        <div className={styles.logs}>
            <h2>Logs des transactions</h2>
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
import React, { useEffect, useState } from 'react'
import { useEth } from "../../../contexts/EthContext";
import ClipLink from '../../atoms/ClipLink/ClipLink'
import styles from './Logs.module.css'

const Logs = () => {

    const { state: { contract, accounts  } } = useEth();
    const [logs, setLogs] = useState([])



    useEffect(() =>{
        (async() => {
            if (accounts){
                if (logs.length === 0){
                    const events = await contract.getPastEvents('transaction', { fromBlock: 0, toBlock: 'latest' })
                    setLogs(events.reverse().map(event => {
                        return {
                                from : event.returnValues.from,
                                to : event.returnValues.to,
                                value : event.returnValues.value,
                        }
                    }))
                }

                await contract.events.transaction({fromBlock:"earliest"})
                .on('data', event =>
                    {
                        const newLogs = [{
                            from : event.returnValues.from,
                            to : event.returnValues.to,
                            value : event.returnValues.value,
                        }, ...logs]
                        console.log(newLogs)
                        setLogs(newLogs)
                    }
                )          
                .on('changed', changed => console.log('changed', changed))
                .on('error', err => console.log('err', err))
                .on('connected', str => console.log('connected', str))            
            }
        })()
    }, [accounts,logs])

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
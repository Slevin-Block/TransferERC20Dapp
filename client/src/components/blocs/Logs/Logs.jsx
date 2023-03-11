import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { BlockNumber } from '../../../contexts/BlockNumber/BlockNumber';
import { useEth } from "../../../contexts/EthContext";
import ClipLink from '../../atoms/ClipLink/ClipLink'
import styles from './Logs.module.css'

const Logs = () => {

    const { state: { contract, accounts  } } = useEth();
    const [logs, setLogs] = useState([])
    const blockNumber = useRecoilValue(BlockNumber)

    useEffect(() =>{
        (async() => {
            if (accounts && blockNumber){
                if (logs.length === 0){
                    const events = await contract.getPastEvents('transaction', { fromBlock: blockNumber, toBlock: 'latest' })
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
                        setLogs(newLogs)
                    }
                )          
                .on('changed', changed => console.log('changed', changed))
                .on('error', err => console.log('err', err))
                .on('connected', str => console.log('connected', str))            
            }
        })()
    }, [accounts, blockNumber])

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
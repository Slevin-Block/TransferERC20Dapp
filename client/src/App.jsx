import { useEth } from "./contexts/EthContext";
import { useEffect, useState } from "react";
import styles from './App.module.css'
import { z } from "zod"
import Link from "./components/Link";

function App() {
    const [data, setData] = useState({address : '', amount : ''})
    const { state: { contract, accounts } } = useEth();
    const [balance, setBalance] = useState(0)
    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const schemaAddress = z.string().regex(/^(0x[0-9a-fA-F]{40})?$/i)
    const schemaAmount = z.string().regex(/^[0-9]*$/i)

    const read = async () => {
        return await contract.methods.balanceOf(accounts[0]).call({ from: accounts[0] });
    };

    const transfert = async () => {
        const to = data.address
        if (!schemaAddress.safeParse(to).success)   return console.log("Error Address")
        if (!schemaAmount.safeParse(data.amount).success) return console.log("Error Amount")
        const value = parseInt(data.amount)
        if (value > balance) return console.log('Not enough fund')
        setIsLoading(true)
        try{
            await contract.methods.transfer(to, value).send({ from: accounts[0] });
        }catch(err){
            setIsLoading(false)
        }
        setIsLoading(false)
        setBalance(await read());
        check()
        setData({address : '', amount : ''})
    };

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

    useEffect(() => {
        accounts &&
            (async () => {
                const value = await read()
                setBalance(value);
                check()
            })()
    }, [accounts])

    return (
        <div id="App">
            <div className={styles.header}>
                <h1>TRANSFERER VOS ERC20</h1>
            </div>
            <div className={styles.controlPanel}>
                <h2>Panneau de commande</h2>
                <div className={styles.infos}>
                    {!!contract?._address && <label>Contract :<p>{contract._address}</p></label>}
                    {!!accounts && <label>Client :<Link>{accounts[0]}</Link></label>}
                    {!!accounts && <label>Balance du client :<Link error={parseInt(data.amount) > balance && schemaAmount.safeParse(data.amount).success}>{balance}</Link></label>}
                </div>
                <div className={styles.inputs}>
                    <input
                        value = {data.address}
                        onChange={(e)=>setData({...data, address : e.target.value})}
                        placeholder='adresse du destinataire'
                        className={!!(data.address.length > 0) ? (!schemaAddress.safeParse(data.address).success ? styles.inputError : styles.inputValid) : ''}
                    />
                    <input
                        value = {data.amount}
                        onChange={(e)=>setData({...data, amount : e.target.value})}
                        placeholder="quantité d'ERC20"
                        className={!!data.amount ? (!schemaAmount.safeParse(data.amount).success ? styles.inputError : styles.inputValid) : ''}
                    />
                </div>
                <div className={styles.buttons}>
                    {isLoading ?
                        <div className={styles.loader}></div>
                    :    
                        <button
                            onClick={transfert}
                            disabled={
                                !schemaAddress.safeParse(data.address).success ||
                                !schemaAmount.safeParse(data.amount).success ||
                                parseInt(data.amount) > balance ||
                                data.address === '' ||
                                data.amount === ''
                            }
                        >
                            Send
                        </button>
                    }
                </div>
                
            </div>

            <div className={styles.logs}>
                <h2>Logs des transactions</h2>
                <div className={styles.listLogs}>
                {
                    logs.length > 0 &&
                        logs.map((log, i) =>
                            <div key={i} className={styles.logItem}>
                                <Link>{log.from}</Link>
                                <p>{'=>'}</p>
                                <Link>{log.to}</Link>
                                <Link className={styles.value}>{log.value}</Link>
                            </div>
                        )
                }
                </div>

            </div>
        </div>
    );
}

export default App;

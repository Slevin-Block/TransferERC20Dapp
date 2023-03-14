import React, { useEffect, useState } from 'react'
import styles from './ControlPanel.module.css'
import ClipLink from "../../atoms/ClipLink/ClipLink";
import { useRxWeb3 } from '../../../contexts/RxWeb3';
import { balanceof$, schemaAmount, schemaAddress, transfert } from '../../../contexts/states';

const ControlPanel = () => {
    const { contractAddress, account, action  } = useRxWeb3()
    const [data, setData] = useState({ address: '0x4074218Bdb395ae4E0cDa26c1F124727EA65b70F', amount: '123' })

    const [balanceOf, setBalanceOf] = useState(0)

    useEffect(() => {
        balanceof$.subscribe(newBalance => setBalanceOf(newBalance))
    }, [])

    const handleTransfert = () => {
        transfert(action, account, data.address, data.amount, balanceOf, setData)
    
    }

    return (
        <div className={styles.controlPanel}>
            <h2>Panneau de commande</h2>

            <div className={styles.infos}>
                {!!contractAddress && <label>Contract :<p>{contractAddress}</p></label>}
                {!!account && <label>Client :<ClipLink>{account}</ClipLink></label>}
                {!!account && <label>Balance du client :<ClipLink error={parseInt(data.amount) > balanceOf && schemaAmount.safeParse(data.amount).success}>{balanceOf}</ClipLink></label>}
            </div>

            <div className={styles.inputs}>
                <input
                    value={data.address}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    placeholder='adresse du destinataire'
                    className={!!(data.address.length > 0) ? (!schemaAddress.safeParse(data.address).success ? styles.inputError : styles.inputValid) : ''}
                />
                <input
                    value={data.amount}
                    onChange={(e) => setData({ ...data, amount: e.target.value })}
                    placeholder="quantité d'ERC20"
                    className={!!data.amount ? (!schemaAmount.safeParse(data.amount).success ? styles.inputError : styles.inputValid) : ''}
                />

            </div>
            <div className={styles.buttons}>
                {false ?
                    <div className={styles.loader}></div>
                    :
                    <button
                        onClick={handleTransfert}
                        disabled={
                            !schemaAddress.safeParse(data.address).success ||
                            !schemaAmount.safeParse(data.amount).success ||
                            parseInt(data.amount) > balanceOf ||
                            data.address === '' ||
                            data.amount === ''
                        }
                    >
                        Send
                    </button>
                }
            </div>
        </div>
    )
}

export default ControlPanel
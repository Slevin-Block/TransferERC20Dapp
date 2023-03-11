import React from 'react'
import styles from './ControlPanel.module.css'
import ClipLink from "../../atoms/ClipLink/ClipLink";
import { useManage } from './useManage';

const ControlPanel = () => {

    const {accounts, contract, balance, data, setData, schemaAddress, schemaAmount, transfert, isLoading} = useManage()

    return (
        <div className={styles.controlPanel}>
            <h2>Panneau de commande</h2>

            <div className={styles.infos}>
                {!!contract?._address && <label>Contract :<p>{contract._address}</p></label>}
                {!!accounts && <label>Client :<ClipLink>{accounts[0]}</ClipLink></label>}
                {!!accounts && <label>Balance du client :<ClipLink error={parseInt(data.amount) > balance && schemaAmount.safeParse(data.amount).success}>{balance}</ClipLink></label>}
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
    )
}

export default ControlPanel
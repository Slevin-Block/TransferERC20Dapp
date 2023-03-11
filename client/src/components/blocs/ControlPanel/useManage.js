import { useEth } from "../../../contexts/EthContext";
import { z } from "zod"
import { useEffect, useState } from "react";

export const useManage = (update) => {
    const [data, setData] = useState({address : '', amount : ''})
    const { state: { contract, accounts } } = useEth();
    const [balance, setBalance] = useState(0)
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
        setData({address : '', amount : ''})
        update()
    };


    useEffect(() => {
        accounts &&
            (async () => {
                const value = await read()
                setBalance(value);
            })()
    }, [accounts])

    return {accounts, contract, balance, data, setData, schemaAddress, schemaAmount, transfert, isLoading}
}
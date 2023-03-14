import { BehaviorSubject } from "rxjs";
import { z } from "zod";
import { deploymentObject$ } from "./RxWeb3";

//----------------------------------------------------------------------------------------
// INITIALISATION
//--------------------------

let balanceof = 0
export const balanceof$ = new BehaviorSubject(balanceof)
let connexionRef = {}

export const schemaAddress = z.string().regex(/^(0x[0-9a-fA-F]{40})?$/i)
export const schemaAmount = z.string().regex(/^[0-9]*$/i)


//----------------------------------------------------------------------------------------
// START
//--------------------------
deploymentObject$.subscribe(obj =>{
    connexionRef = obj;
    if (connexionRef?.contract && connexionRef?.account){
        getBalance()
    }
})

const getBalance = () => {
        const {contract, account } = connexionRef
        contract.methods.balanceOf(account).call({ from: account })
            .then((newBalance) => {
                balanceof = newBalance
                balanceof$.next(balanceof)
            })
}

//----------------------------------------------------------------------------------------
// ACTIONS
//--------------------------
export const transfert = async (action, from, to, amount, balance, setter) => {
        if (!schemaAddress.safeParse(to).success) return console.log("Error Address")
        if (!schemaAmount.safeParse(amount).success) return console.log("Error Amount")
        const value = parseInt(amount)
        if (value > balance) return console.log('Not enough fund')
        try {
            await action.transfer(to, value).send({ from });
            setter({ address: '', amount: '' })
            getBalance()
        } catch (err) {
            console.log(err)
        }
    };




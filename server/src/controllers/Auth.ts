import {Request, Response} from 'express'
const register = async(req:Request,res:Response)=>{
    try {
       res.send('chal gya beta')
    } catch (error:any) {
        res.status(400).json({message: error.message})
    }
}

export {register}
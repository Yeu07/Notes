import type { Response, Request, NextFunction } from "express";
import rateLimit from "../config/upstash.js";

const rateLimiter = async(req:Request, res:Response,next: NextFunction) => {
    try {
        const identifier = req.ip || "global-fallback";
        const {success} = await rateLimit.limit(identifier)

        if(!success) return res.status(429).json({message:"Too many request, plase try again later"})
        next()
    } catch (error) {
        console.log("Rate limit error",error)
        next()
    }
}

export default rateLimiter;
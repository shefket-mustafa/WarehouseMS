
import crypto from "crypto"

export default function generateCode(){

    return "WH-" + crypto.randomUUID().slice(0,8).toUpperCase();
}
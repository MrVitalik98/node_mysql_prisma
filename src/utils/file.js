import { unlink } from "fs/promises"
import path from 'path'
import { __dirname } from "../middlewares/file-upload.js"

export const deleteFile = async (filename) => {
    const baseUrl = path.resolve(__dirname, '..', 'public', 'images')
    const pathToFile = `${baseUrl}/${filename}`
    if(pathToFile) await unlink(pathToFile)
}

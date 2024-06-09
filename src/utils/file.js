import { unlink } from "fs/promises"

export const deleteFile = async (path) => {
    if(path ) await unlink(path)
}

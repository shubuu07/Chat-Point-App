import io from 'socket.io-client'
import config from "../env/index"

const SOCKET_URL = config.API_URL
class WSService {

    initialzeSocekt = async (userId) => {
        try {
            this.socket = io(SOCKET_URL, {
                transports: ["websocket"]

            })

            this.socket.on("connect", () => {
                console.log("=== socket connected ===")
                this.socket.emit('user_online', { userId })

            })
            this.socket.on("disconnect", (data) => {
                console.log("=== socket disconnected ===")
            })
            this.socket.on("error", (data) => {
                console.log("=== socket error ===", data)
            })

        } catch (error) {
            console.log("=== socket is not initialized ===", error)
        }
    }

    on(event, data = {}) {
        this.socket.on(event, data)
    }
    emit(event, cb) {
        this.socket.emit(event, cb)
    }
    removeListener(listName) {
        this.socket.removeListener(listName)
    }
}

const socketServices = new WSService()
export default socketServices


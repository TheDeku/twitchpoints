import { statusEnum } from './statusEnum'

export default class ResponseData {
    status: statusEnum
    message: string
    data: any

    constructor(_status: statusEnum, _message: string, _data: any) {
        this.status = _status
        this.message = _message
        this.data = _data
    }
}

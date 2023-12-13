class appError{
    constructor(status, msg){
        this.status = status
        this.message = msg
    }
}

module.exports = appError
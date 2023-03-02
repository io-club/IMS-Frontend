class UserExistsError extends Error {
    constructor() {
        super()
        this.name = 'UserExistsError'
        this.message = 'The user already exists'
    }
}

export { UserExistsError }

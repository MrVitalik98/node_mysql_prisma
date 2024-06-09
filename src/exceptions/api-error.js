export class ApiError extends Error {
    errors
    status
  
    constructor(status, message, errors) {
      super(message)
      this.status = status
      this.errors = errors
    }
  
    static BadRequestError(message, errors = []) {
      return new ApiError(400, message, errors)
    }
  
    static UnauthorizedError() {
      return new ApiError(401, 'User is not authorized')
    }
}
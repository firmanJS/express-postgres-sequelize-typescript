interface ExceptionsInterface {
  error?: string,
  message?: string,
}

interface WithDataInterface {
  status?: string,
  message?: string,
  data?: [] | object
}

interface DataInterface {
  data?: object
}

export {
  ExceptionsInterface,
  WithDataInterface,
  DataInterface
}

const authLogger = (config: any) => (set: any, get: any, api: any) => config(
    (...args: any) => {
        console.log('Logger args :', args)
        set(...args)
        console.log('Logger nouvel état:', get())
    },
    get,
    api
)

export default authLogger;
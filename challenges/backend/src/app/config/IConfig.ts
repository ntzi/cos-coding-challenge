export interface IConfig {
    credential: {
        testUser: {
            readonly userMailId: string,
            readonly password: string
        }
    },
    api: {
        readonly baseUrl: string
    }
}

import dotenv from 'dotenv'
const modes = [
    '.env.local',
    '.env',
]
let env: Record<string, string> = {}
for (let i = 0; i < modes.length; i++) {
    const mode = modes[i]
    const result = dotenv.config({ path: mode })
    if (result.parsed) {
        env = Object.assign(result.parsed, env)
    }
}

export const NODE_ENV = env.NODE_ENV
console.log(`NODE_ENV=${JSON.stringify(NODE_ENV)}`)
export const __DEV__ = NODE_ENV === 'development'

if (__DEV__) {
    console.log(env)
}

export const PORT = Number(env.PORT || 3000)
// 时区
export const TZ = env.TZ || 'Asia/Shanghai'

export const TIMEOUT = Number(env.TIMEOUT || 10 * 1000)

// mongodb 配置
export const MONGODB_URL = env.MONGODB_URL
export const MONGODB_USER = env.MONGODB_USER
export const MONGODB_PASSWORD = env.MONGODB_PASSWORD
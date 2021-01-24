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

export const __DEV__ = NODE_ENV === 'development'

if (__DEV__) {
    console.log(env)
}

export const PORT = Number(env.PORT || 3000)

export const TIMEOUT = Number(env.TIMEOUT || 10 * 1000)

export const TZ = env.TZ || 'Asia/Shanghai'
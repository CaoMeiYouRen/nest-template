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
if (env.NODE_ENV === 'development') {
    console.log(env)
}

export const PORT = parseInt(env.PORT || '3000')
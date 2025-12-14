import Redis, { Redis as RedisClient } from 'ioredis'

class RedisChace {
    private client: RedisClient | null = null

    constructor() {
        this.connect()
    }

    private connect(): void {
        const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'

        this.client = new Redis(redisUrl, {
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000)
                return delay
            },
            maxRetriesPerRequest: 3,
        })

        this.client.on('connect', () => {
            console.log('✅ Conectado ao Redis com sucesso.')
        })

        this.client.on('error', (err) => {
            console.error('❌ Erro na conexão com Redis:', err)
        })
    }

    /**
     * Salva um valor no cache (Publicar)
     * @param key Chave identificadora
     * @param value Dado a ser salvo (pode ser objeto, string, numero)
     * @param ttlInSeconds Tempo de vida em segundos (padrão: 3600s / 1 hora)
     */
    public async set(key: string, value: any, ttlInSeconds: number = 3600): Promise<void> {
        if (!this.client) {
            console.warn('Redis client não inicializado.')
            return
        }

        try {
            const stringValue = JSON.stringify(value)
            // 'EX' define o tempo de expiração em segundos
            await this.client.set(key, stringValue, 'EX', ttlInSeconds)
        } catch (error) {
            console.error(`Erro ao definir cache para a chave ${key}:`, error)
        }
    }

    /**
     * Busca um valor no cache
     * @param key Chave identificadora
     * @returns O dado no formato original ou null se não encontrado
     */
    public async get<T>(key: string): Promise<T | null> {
        if (!this.client)
            return null

        try {
            const data = await this.client.get(key)

            if (data === "null" || data === null) return null

            return JSON.parse(data) as T
        } catch (error) {
            console.error(`Erro ao buscar cache para a chave ${key}:`, error)
            return null
        }
    }

    public async del(key: string): Promise<void> {
        if (this.client)
            await this.client.del(key)
    }
}

export default RedisChace

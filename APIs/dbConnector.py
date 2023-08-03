import aiomysql

class DBConnector:
    def __init__(self, host, port, user, password, database):
        self.host = host
        self.port = port
        self.user = user
        self.password = password
        self.database = database
        self.pool = None

    async def connect(self):
        self.pool = await aiomysql.create_pool(
            host=self.host,
            port=self.port,
            user=self.user,
            password=self.password,
            db=self.database,
            autocommit=True
        )

    async def disconnect(self):
        if self.pool is not None:
            self.pool.close()
            await self.pool.wait_closed()

    async def execute_query(self, query, *args):
        async with self.pool.acquire() as conn:
            async with conn.cursor() as cursor:
                await cursor.execute(query, args)
                return await cursor.fetchall()

def get_db_connector():
    db_config = {
        "host": "db",
        "port": 3306,
        "user": "project",
        "password": "project",
        "database": "project"
    }
    return DBConnector(**db_config)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { NestExpressApplication } from '@nestjs/platform-express';
const env = process.env

async function start() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Настройка CORS
  app.enableCors({
    origin: env.NEXT_API_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  console.log(process.env.MYSQL_HOST)

  // Проверка и создание пользователей (администратор и пользователь)
  const usersService = app.get(UsersService);
  const adminExists = await usersService.findOne('admin');
  if (!adminExists) {
    await usersService.create({ username: 'admin', password: 'admin', role: 'admin' });
  }
  const userExists = await usersService.findOne('user');
  if (!userExists) {
    await usersService.create({ username: 'user', password: 'user', role: 'user' });
  }

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
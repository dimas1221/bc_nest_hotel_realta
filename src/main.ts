import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';

const port = process.env.PORT || 6000;

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  // biar bisa di akses keluar
  app.enableCors();
  // end
  await app.listen(port, () => {
    console.log('Listen on port ' + port);
  });
}
bootstrap();

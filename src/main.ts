import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { urlencoded, json } from 'express';
const port = process.env.PORT || 6000;
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  // app.use(
  //   '/public/upload',
  //   express.static(path.join(__dirname, '../public/upload')),
  // );
  // biar bisa di akses keluar
  app.enableCors();
  // app.use(json({ limit: '50mb' }));
  // app.use(urlencoded({ extended: true, limit: '50mb' }));
  // end
  await app.listen(port, () => {
    console.log('Listen on port ' + port);
  });
}
bootstrap();

// nestjs hoạt động theo kiểu mô hình module, tức lầ có một module to và nhiều module nhỏ, mỗi module đảm nhận một nhiệm vụ -> thuận tiện cho việc mở rộng app

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());  // dòng này để code có thể ăn được validate

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJs-Begin')
    .setDescription('The APIs description')
    .setVersion('1.0')
    .addTag('DungVS')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //

  const PORT = 3000;
  await app.listen(PORT, () => {
    console.log("App running on port 3000");
  });

  const ts = () => {
    console.log("ádf");
  };
}
bootstrap();

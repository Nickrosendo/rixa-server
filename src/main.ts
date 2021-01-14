import { NestFactory } from '@nestjs/core';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from '@root/app.module';

const port = process.env.PORT || 3001;
async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
	);
	await app.listen(port, (err, address) => {
		if (!err) console.warn(`Server running on: ${address}`);
	});
}
bootstrap();

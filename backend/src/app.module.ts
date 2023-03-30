import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from '@config/environment';
import { FeaturesModule } from '@features/features.module';
import { MongooseForRootConfigModule } from '@config/mongoose';
import { CoreModule } from './core.module';

@Module({
	imports: [CoreModule, EnvironmentConfigModule, MongooseForRootConfigModule, FeaturesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

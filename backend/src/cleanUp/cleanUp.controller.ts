import { Controller, Delete } from '@nestjs/common';
import { CleanupService } from './cleanUp.service';

@Controller('cleanup')
export class CleanupController {
  constructor(private readonly cleanupService: CleanupService) {}

  @Delete()
  async cleanUp() {
    await this.cleanupService.cleanUp();
    return { message: 'Данные успешно очищены' };
  }
}
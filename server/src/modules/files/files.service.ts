import { join } from 'path';
import {
  writeFile,
  readFile,
  access,
  constants,
  stat,
  mkdir,
} from 'fs/promises';

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { ConfigurationService } from 'src/modules/configuration/configuration.service';

const logger = new Logger('Files Service');

@Injectable()
export class FilesService implements OnModuleInit {
  constructor(private readonly configurationService: ConfigurationService) {}

  private getFullPath(path: string): string {
    return join(this.configurationService.filesRootFolder, path);
  }

  async writeFile(path: string, contents: Buffer): Promise<void> {
    return writeFile(this.getFullPath(path), contents);
  }

  async readFile(path: string): Promise<Buffer> {
    return readFile(this.getFullPath(path));
  }

  async mkdir(path: string): Promise<void> {
    mkdir(this.getFullPath(path), { recursive: true });
  }

  async onModuleInit() {
    let doesRootDirectoryExists = false;

    try {
      await stat(this.configurationService.filesRootFolder);
      doesRootDirectoryExists = true;
    } catch (error) {
      logger.error(
        `Given root directory ${this.configurationService.filesRootFolder} does not exist`,
      );
    }

    if (!doesRootDirectoryExists) {
      try {
        logger.log(
          `Trying to create root directory ${this.configurationService.filesRootFolder}`,
        );
        await mkdir(this.configurationService.filesRootFolder, {
          recursive: true,
        });
      } catch (error) {
        logger.error(
          `Could not create root directory ${this.configurationService.filesRootFolder}`,
        );
        logger.error(error);
        return;
      }
    }

    try {
      await access(this.configurationService.filesRootFolder, constants.R_OK);
    } catch (error) {
      logger.error(
        `Given root directory ${this.configurationService.filesRootFolder} is not readable`,
      );
    }

    try {
      await access(this.configurationService.filesRootFolder, constants.W_OK);
    } catch (error) {
      logger.error(
        `Given root directory ${this.configurationService.filesRootFolder} is not writable`,
      );
    }
  }
}

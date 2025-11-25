export class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  info(message: string): void {
    console.log(`[${this.getTimestamp()}] INFO: ${message}`);
  }

  warn(message: string): void {
    console.warn(`[${this.getTimestamp()}] WARN: ${message}`);
  }

  error(message: string): void {
    console.error(`[${this.getTimestamp()}] ERROR: ${message}`);
  }

  debug(message: string): void {
    console.log(`[${this.getTimestamp()}] DEBUG: ${message}`);
  }

  log(message: string): void {
    console.log(`[${this.getTimestamp()}] LOG: ${message}`);
  }
}

export const logger = new Logger();

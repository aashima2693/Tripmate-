
import fs from 'fs';
import path from 'path';

class Logger {
    constructor() {
        this.logDir = path.join(process.cwd(), 'logs');
        this.ensureLogDirectory();
    }

    ensureLogDirectory() {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }

    formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}\n`;
    }

    log(level, message) {
        const formattedMessage = this.formatMessage(level, message);
        console.log(formattedMessage.trim());
        
        const logFile = path.join(this.logDir, `${new Date().toISOString().split('T')[0]}.log`);
        fs.appendFileSync(logFile, formattedMessage);
    }

    info(message) {
        this.log('INFO', message);
    }

    error(message) {
        this.log('ERROR', message);
    }

    warn(message) {
        this.log('WARN', message);
    }

    debug(message) {
        if (process.env.NODE_ENV === 'development') {
            this.log('DEBUG', message);
        }
    }
}

export default new Logger();

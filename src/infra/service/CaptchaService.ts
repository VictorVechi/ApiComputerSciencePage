import { injectable } from 'tsyringe';
import axios from 'axios';
import { ICaptchaService } from '../../domain/service/ICaptchaService';

@injectable()
export default class CaptchaService implements ICaptchaService {
    private get secretKey(): string | undefined {
        return process.env.RECAPTCHA_SECRET_KEY;
    }

    public async verify(token: string): Promise<boolean> {
        if (!token || !this.secretKey) {
            return false;
        }

        try {
            const response = await axios.post(
                'https://www.google.com/recaptcha/api/siteverify',
                null,
                {
                    params: {
                        secret: this.secretKey,
                        response: token
                    }
                }
            );

            const { success, score, 'error-codes': errorCodes } = response.data;

            if (!success && errorCodes) {
                console.error('reCAPTCHA validation failed:', errorCodes);
            }

            return success === true && score >= 0.5;
        } catch (error) {
            console.error('Erro ao verificar reCAPTCHA:', error);
            return false;
        }
    }
}

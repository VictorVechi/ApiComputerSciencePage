export interface ICaptchaService {
    verify(token: string): Promise<boolean>;
}

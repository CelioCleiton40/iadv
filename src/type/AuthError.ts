export interface AuthError {
    message: string;
    response?: {
        status: number;
        data?: any;
    };
}
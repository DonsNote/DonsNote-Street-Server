export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
    timestamp: string;
}

export const success = <T>(data: T, message?: string): ApiResponse<T> => {
    return {
        success: true,
        data,
        message,
        timestamp: new Date().toISOString()
    };
};

export const error = (message: string, details?: any): ApiResponse => {
    return {
        success: false,
        error: message,
        timestamp: new Date().toISOString(),
        ...(details && { details })
    };
};

export const created = <T>(data: T, message = 'Resource created successfully'): ApiResponse<T> => {
    return success(data, message);
};

export const updated = <T>(data: T, message = 'Resource updated successfully'): ApiResponse<T> => {
    return success(data, message);
};

export const deleted = (message = 'Resource deleted successfully'): ApiResponse => {
    return success(null, message);
};
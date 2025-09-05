export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateRequired = (value: any, fieldName: string): string | null => {
    if (!value || (typeof value === 'string' && value.trim().length === 0)) {
        return `${fieldName} is required`;
    }
    return null;
};

export const validateLength = (value: string, min: number, max: number, fieldName: string): string | null => {
    if (value.length < min) {
        return `${fieldName} must be at least ${min} characters long`;
    }
    if (value.length > max) {
        return `${fieldName} must be no more than ${max} characters long`;
    }
    return null;
};

export const validateUser = (userData: any): string[] => {
    const errors: string[] = [];
    
    const nameError = validateRequired(userData.name, 'Name');
    if (nameError) errors.push(nameError);
    
    const emailError = validateRequired(userData.email, 'Email');
    if (emailError) errors.push(emailError);
    else if (!validateEmail(userData.email)) {
        errors.push('Invalid email format');
    }
    
    const infoError = validateRequired(userData.info, 'Info');
    if (infoError) errors.push(infoError);
    
    return errors;
};

export const validateArtist = (artistData: any): string[] => {
    const errors: string[] = [];
    
    const nameError = validateRequired(artistData.artistName, 'Artist name');
    if (nameError) errors.push(nameError);
    
    const infoError = validateRequired(artistData.artistInfo, 'Artist info');
    if (infoError) errors.push(infoError);
    
    const genresError = validateRequired(artistData.genres, 'Genres');
    if (genresError) errors.push(genresError);
    
    return errors;
};
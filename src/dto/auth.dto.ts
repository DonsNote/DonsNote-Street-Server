export interface LocalSignupDTO {
    name?: string;
    email: string;
    password: string;
    info?: string;
    userImgURL?: string;
}

export interface AppleSignupDTO {
    authcode: string;
    appleId?: string;
    identityToken?: string;
    email?: string;
    fullName?: string;
}

export interface GoogleSignupDTO {
    accessToken: string;
    googleId?: string;
    idToken?: string;
    email?: string;
    name?: string;
    profileImageUrl?: string;
}
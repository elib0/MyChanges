export interface CurrencyType {
    USD: number;
    EUR?: number;
    BTC?: number;
}

interface TimestampType {
    timestamp: Date;
}

export interface RateType extends TimestampType {
    name: string;
    currencies?: CurrencyType;
    average: number;
}

// Components props
export interface VSnackbarsProps {
    show?: boolean;
    dark?: boolean;
    color?: string | null;
    icon?: string | null;
    cod?: string;
    messages?: string;
}

// Login
export interface FileUpload {
    file?: File | Array<File>;
    photoURL?: string | string[];
}

// Types Sign Users
export interface UserType {
    displayName: string | null;
    email?: string;
    emailVerified?: boolean;
    metadata?: object;
    phoneNumber?: string;
    refreshToken?: string;
    uid?: string;
    photoUrl: string | null;
    birthday?: Date;
}

export interface LoginType {
    email: string;
    password: string;
}

// Components props
export interface VSnackbarsProps {
    show?: boolean;
    dark?: boolean;
    color?: string | null;
    icon?: string | null;
    cod?: string;
    messages?: string;
}

//Firestore models
export interface ProfileType {
    id?: string;
    displayName: string;
    email: string;
    isAdmin?: boolean;
    isWaitress?: boolean;
    isChef?: boolean;
    photoURL?: string;
}

// Exceptions
export class UserError extends Error {
    show: boolean;
    // dark: boolean;
    color: string | null;
    icon: string | null;
    cod: string | null;
    message: string;

    constructor(message: string, color: string | null = 'error', icon: string | null = 'fa-ban', cod?: string) {
        super(message);
        this.show = true;
        this.message = message;
        this.color = color;
        this.icon = icon;
        this.cod = cod || null;
    }
}

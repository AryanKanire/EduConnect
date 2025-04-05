export type User = {
    id: string;
    role: 'student' | 'admin' | 'teacher';
    name?: string;
    email: string;
};

export type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

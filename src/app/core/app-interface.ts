// Interfaces to be shared accross all modules of application should reside here
interface IResponse {
    success: string;
    data: any;
    message: string;
    error: any;
}

interface IUserProfile {
    userId: string,
    isAdmin: boolean;
    name: string;
    token: string;
    role: string;
    isSuperAdmin: boolean
}

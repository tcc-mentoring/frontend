interface LoginForm {
    email: string;
    password: string;
}

export function validateLogin({email, password}: LoginForm): Record<string, string> {
    const errors: Record<string, string> = {}

    if (!password || typeof password !== "string") {
        errors.password = "required";
    }

    if (!email || typeof email !== "string") {
        errors.email = "required";
    }

    return errors;
}
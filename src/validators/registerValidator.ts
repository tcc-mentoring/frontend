interface RegisterForm {
    password: string;
    confirmPassword: string;
    email: string;
    firstName: string;
    lastName: string;
}

export function validateRegister(registerForm: RegisterForm): Record<string, string> { 
    const errors: Record<string, string> = {}

    if (registerForm.password !== registerForm.confirmPassword) {
        errors.password = "matchPassword";
    }

    if (!registerForm.password || typeof registerForm.password !== "string") {
        errors.password = "required";
    }

    if (!registerForm.confirmPassword || typeof registerForm.confirmPassword !== "string") {
        errors.confirmPassword = "required";
    }

    if (!registerForm.email || typeof registerForm.email !== "string") {
        errors.email = "required";
    }

    if (!registerForm.firstName || typeof registerForm.firstName !== "string") {
        errors.firstName = "required";
    }

    if (!registerForm.lastName || typeof registerForm.lastName !== "string") {
        errors.lastName = "required";
    }

    return errors;
}
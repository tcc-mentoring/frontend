import { BACKEND } from "$env/static/private";
import { fail, json, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    register: async ({request}) => { 
        const formData = await request.formData();
        
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");

        const errors: Record<string, string> = {}

        if (password !== confirmPassword) {
            errors.password = "matchPassword";
        }

        if (!password || typeof password !== "string") {
            errors.password = "required";
        }

        if (!confirmPassword || typeof confirmPassword !== "string") {
            errors.confirmPassword = "required";
        }

        if (!email || typeof email !== "string") {
            errors.email = "required";
        }

        if (!firstName || typeof firstName !== "string") {
            errors.firstName = "required";
        }

        if (!lastName || typeof lastName !== "string") {
            errors.lastName = "required";
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { errors });
        }
        
        try {
            const fetchCreateUser = await fetch(`${BACKEND}user`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName})
            })
            console.log({fetchCreateUser})
            if (fetchCreateUser.status === 201 ) {
                return {success: true};
            }
    
            const createUserResponse = await fetchCreateUser.json();
    
            if (createUserResponse.statusCode === 400) {
                return fail(400, {serverErrors: createUserResponse.message})
            } else if (createUserResponse.statusCode === 404) {
                return fail(400, {serverErrors: ["resourceNotFound"]})
            }
        } catch (err) {
            return fail(500, {serverErrors: ["serverError"]})
        }

    
    }
};
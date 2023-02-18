import { BACKEND } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { validateRegister } from "../../validators/registerValidator";

export const actions: Actions = {
    register: async ({cookies, request}) => { 
        const formData = await request.formData();
        
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;

        const errors = validateRegister({email, password, confirmPassword, firstName, lastName});

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
            
            const createUserResponse = await fetchCreateUser.json();
            
            if (fetchCreateUser.ok) {
                cookies.set('session', createUserResponse.userAuthUUID, {
                    path: '/',
                    httpOnly: true,
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 7,
                  });
            }
    
            if (createUserResponse.statusCode === 400) {
                return fail(400, {serverErrors: createUserResponse.message})
            }
        } catch (err) {
            return fail(500, {serverErrors: ["serverError"]})
        }

        throw redirect(302, "/")
    }
};
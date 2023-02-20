import moment from "moment";

interface OcupationForm {
    description: string;
    company: string;
    startDate: string;
    endDate?: string;
}

export function validateOcupation(ocupationForm: OcupationForm): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!ocupationForm.description || typeof ocupationForm.description !== "string") {
        errors.description = "required";
    }

    if (!ocupationForm.company || typeof ocupationForm.company !== "string") {
        errors.company = "required";
    }

    if (!ocupationForm.startDate || typeof ocupationForm.startDate !== "string") {
        errors.startDate = "required";
    }

    if (!moment(ocupationForm.startDate).isValid()) {
        errors.startDate = "invalidDate";
    }

    if (!!ocupationForm.endDate && !moment(ocupationForm.endDate).isValid()) {
        errors.endDate = "invalidDate";
    }

    return errors;
}
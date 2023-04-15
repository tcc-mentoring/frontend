import moment from "moment";

interface OcupationForm {
    description: string;
    company: string;
    startDate: string;
    endDate?: string;
}

interface AcademyEntryForm {
    course: string;
    institution: string;
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

    if (!moment.utc(ocupationForm.startDate).isValid()) {
        errors.startDate = "invalidDate";
    }

    if (!!ocupationForm.endDate && !moment.utc(ocupationForm.endDate).isValid()) {
        errors.endDate = "invalidDate";
    }

    return errors;
}

export function validateAcademyEntry(academyEntryForm: AcademyEntryForm): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!academyEntryForm.course || typeof academyEntryForm.course !== "string") {
        errors.course = "required";
    }

    if (!academyEntryForm.institution || typeof academyEntryForm.institution !== "string") {
        errors.institution = "required";
    }

    if (!academyEntryForm.startDate || typeof academyEntryForm.startDate !== "string") {
        errors.startDate = "required";
    }

    if (!moment.utc(academyEntryForm.startDate).isValid()) {
        errors.startDate = "invalidDate";
    }

    if (!!academyEntryForm.endDate && !moment.utc(academyEntryForm.endDate).isValid()) {
        errors.endDate = "invalidDate";
    }

    return errors;
}
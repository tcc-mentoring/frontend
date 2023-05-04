export interface SessionDTO { 
    id: number;
    endDateTime: string; 
    startDateTime: string;
    as: "mentor" | "mentee";
    with: {
        firstName: string
    } 
}

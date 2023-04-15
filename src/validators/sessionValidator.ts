export interface SessionDTO { 
    id: number;
    endDateTime: string; 
    startDateTime: string; 
    with: {
        firstName: string
    } 
}

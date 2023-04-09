export interface SessionDTO { 
    endDateTime: string; 
    startDateTime: string; 
    with: {
        firstName: string
    } 
}

export function sessionMapToCalendar(session: SessionDTO, role: string, title: string) {
    return {
        end: session.endDateTime, 
        start: session.startDateTime, 
        title: `${title} ${session.with.firstName}`, 
        backgroundColor: role === "mentor" ? "#5F7470" : "#B8BDB5"
    }
}
    

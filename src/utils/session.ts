import type { SessionDTO } from "../validators/sessionValidator";

export function sessionMapToCalendar(session: SessionDTO, role: string, title: string) {
    return {
        end: session.endDateTime, 
        start: session.startDateTime, 
        title: `${title} ${session.with.firstName}`, 
        backgroundColor: role === "mentor" ? "#5F7470" : "#B8BDB5",
        id: session.id,
        extendedProps: session
    }
}
    

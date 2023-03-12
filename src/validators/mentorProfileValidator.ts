export type MentorProfile = {
    user: UserDTO;
    selfDescription: string;
    specialties: string[];
    knowledgeArea: KnowledgeAreas
}
interface UserDTO {
    firstName: string;
    lastName: string;
    email: string;
}

  
enum KnowledgeAreas {
    BIO = "BIO",
    ENG = "ENG",
    SAU = "SAU",
    AGR = "AGR",
    LIT = "LIT",
    SOC = "SOC",
    HUM = "HUM",
    EXA = "EXA"
}
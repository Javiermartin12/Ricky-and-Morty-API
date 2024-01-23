

// Interface for the overall API information
export interface InfoAPI {
    info: Info;          // Information about the API response
    results: Episode[];  // List of episodes
}

// Interface for general information in API responses
export interface Info {
    count: number;      // Total count of items
    pages: number;      // Total number of pages
    next: string;       // URL for the next page
    prev: null;         // URL for the previous page (nullable)
}

// Interface for episode information
export interface Episode {
    id: number;          // Episode ID
    name: string;        // Episode name
    air_date: string;    // Air date of the episode
    episode: string;     // Episode code (e.g., S01E01)
    characters: string[]; // List of character URLs in the episode
    url: string;         // URL of the episode
    created: string;     // Timestamp of creation
}

// Interface for character information
export interface Character {
    name: string;                   // Character name
    status: CharacterStatus;        // Character status (enum)
    species: string;                // Character species
    gender: CharacterGender;        // Character gender (enum)
    // type: string;                // Additional character type (commented out)
    image: string;                  // URL of the character image
}

// Enum for character status
enum CharacterStatus {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "Unknown",
}

// Enum for character gender
enum CharacterGender {
    Male = "Male",
    Female = "Female",
    Unknown = "Unknown",
}

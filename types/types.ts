interface NameData {
    name: string;
    gender: string;
    births?: string;
    confidence?: number;
}

interface WinnerLoser {
    winner: NameData;
    loser: NameData;
}
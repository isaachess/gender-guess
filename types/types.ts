interface NameData {
    name: string;
    gender: string;
    births?: number;
    confidence?: number;
}

interface WinnerLoser {
    winner: NameData;
    loser: NameData;
}
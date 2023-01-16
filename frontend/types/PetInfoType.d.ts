interface PetInfoTypes {

    _id?: string,
    type: string,
    typeTranslated: string,
    name: string,
    genre: string,
    age: number,
    size: number,
    hasDisability: boolean,
    disability: string,
    breed: string,
    particulars: [string],
    lastSeen: {
        whereOwnerLives: boolean,
        state: string,
        state_abbrev: string,
        county: string,
        street: string
    },
    hasReward: boolean,
    rewardAmount: number,
    moreInfo: string,
    postDetails: string
    
}
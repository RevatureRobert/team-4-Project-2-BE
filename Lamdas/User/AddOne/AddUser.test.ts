import {handler} from './AddUser';

describe("AddUser", () => {
    test("Should return Status Code 200", async () => {
        let body = {
            userID: "U#cheeseburger",
            REFERENCE: "0",
            image: "cheeseburger.jpg",
            bio: "I like anime and fast food",
            watchlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
        };

        let request = JSON.stringify(body);
        let response: any = await handler({body:request});
        expect(response.statusCode).toBe(200);
    });    
});
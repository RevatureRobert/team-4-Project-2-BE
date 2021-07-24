import {handler} from './AddUser';

describe("AddUser", () => {
    test("Should return Status Code 200", async () => {
        let userID = "cheeseburger";
        let body = {
            TYPEID: "U#"+userID,
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
    test("Should return Status Code 400", async () => {
        //invalid number of parameters causes 400 status code
        let body = {
            bio: 2,
            watchlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
        };

        let request = JSON.stringify(body);
        let response: any = await handler({body:request});
        expect(response.statusCode).toBe(400);
    });
    
});
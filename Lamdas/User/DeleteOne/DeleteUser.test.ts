import { handler as deleteHandler } from './DeleteUser';
import { handler as add } from '../AddOne/AddUser';

describe("Delete User", () => {
    beforeEach(async () => {
        let body = {
            userID: "cheeseburger",
            REFERENCE: "0",
            image: "cheeseburger.jpg",
            bio: "I like anime and fast food",
            watchlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
        }
        let addRequest = JSON.stringify(body);
        await add({body:addRequest});
    });
    test("Returned Status Code 200", async () => {
        let body = {
            TYPEID: "U#cheeseburger",
        };

        const request = JSON.stringify(body);
        const response:any = await deleteHandler({body:request});
        expect(response.statusCode).toBe(200);
    })
})
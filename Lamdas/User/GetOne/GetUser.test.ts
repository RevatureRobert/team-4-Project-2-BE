import { handler as get } from './GetUser';
import { handler as add } from '../AddOne/AddUser';

describe("GetUser", () => {
    beforeEach(async () => {
        let body = {
            userID: "cheeseburger",
            REFERENCE: "0",
            image: "cheeseburger.jpg",
            bio: "I like anime and fast food",
            wishlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
        }
        let addRequest = JSON.stringify(body);
        await add({body:addRequest});
    });
    test("Should return status code 200", async () => {
        let getBody = {
            userID: "cheeseburger",
        }
        let expectBody = {
            REFERENCE: "0",
            image: "cheeseburger.jpg",
            bio: "I like anime and fast food",
            wishlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
            TYPEID: "U#"+getBody.userID,
        };
        let getRequest = JSON.stringify(getBody);
        let getResponse:any = await get({body:getRequest});
        expect(getResponse.statusCode).toBe(200);
        expect(JSON.parse(getResponse.body)).toStrictEqual(expectBody);
    })
});
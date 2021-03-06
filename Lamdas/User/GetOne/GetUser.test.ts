import { handler as get } from './GetUser';
import { handler as add } from '../AddOne/AddUser';

describe("GetUser", () => {
    beforeEach(async () => {
        let body = {
            userID: "U#cheeseburger",
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
    test("Should return status code 200", async () => {
        let getBody = {
            userID: "U_cheeseburger",
        }
        let expectBody = {
            REFERENCE: "0",
            image: "cheeseburger.jpg",
            bio: "I like anime and fast food",
            watchlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
            TYPEID: "U#cheeseburger",
        };
        let getResponse:any = await get({pathParameters:getBody});
        expect(getResponse.statusCode).toBe(200);
        expect(JSON.parse(getResponse.body)).toStrictEqual(expectBody);
    })
});
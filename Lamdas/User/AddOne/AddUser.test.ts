import {handler} from './AddUser';
import {handler as get} from '../GetOne/GetUser';

describe("AddUser", () => {
    test("Should return Status Code 200", async () => {
        //let userID = "cheeseburger";
        let body = {
            userID: "U_cheeseburger",
            REFERENCE: "0",
            image: "cheeseburger.jpg",
            bio: "I like anime and fast food",
            watchlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
        };
        let getBody = {
            userID: "U_cheeseburger",
        }
        let expectBody = {
            TYPEID: "U_cheeseburger",
            REFERENCE: "0",
            image: "cheeseburger.jpg",
            bio: "I like anime and fast food",
            watchlist: ["One Piece", "Demon Slayer", "DragonBallZ"],
            followed: ["newUser", "taka"],
            favorites: ["One Piece", "Zatch Bell"],
        }
        let request = JSON.stringify(body);
        let response: any = await handler({body:request});
        expect(response.statusCode).toBe(200);
        
        //test to make sure add was successful
        let getResponse:any = await get({pathParameters:getBody});
        expect(JSON.parse(getResponse.body)).toStrictEqual(expectBody);
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
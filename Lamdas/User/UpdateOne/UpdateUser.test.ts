import { handler as update } from './UpdateUser';
import { handler as get } from '../GetOne/GetUser';
import { handler as add } from '../AddOne/AddUser';

describe("UpdateUser", () => {
    beforeEach(async () => {
        let body = {
            userID: "U_cheeseburger",
            REFERENCE: "0",
            image: "burg.jpg",
            bio: "burger time!",
            watchlist: ["anime", "for", "days"],
            followed: ["nobody"],
            favorites: ["nothing"],
        };
        let addRequest = JSON.stringify(body);
        await add({body:addRequest});
    });
    test("Return Status Code 200", async () => {
        let getBody = {
            userID: "U_cheeseburger", 
        }
        let updateBody = {
            userID: "U_cheeseburger",
            REFERENCE: "0",
            image: "burg.jpg",
            bio: "burger time!",
            watchlist: ["anime", "for", "days"],
            followed: ["something", "cool"],
            favorites: ["friends"],
        };
        let expectBody = {
            TYPEID: getBody.userID,
            REFERENCE: "0",
            image: "burg.jpg",
            bio: "burger time!",
            watchlist: ["anime", "for", "days"],
            followed: ["something", "cool"],
            favorites: ["friends"],
        };
        //Update
        let request = JSON.stringify(updateBody);
        let response:any = await update({body:request});

        //Get
        //let getRequest = JSON.stringify(getBody);
        let getResponse:any = await get({pathParameters: getBody});

        expect(response.statusCode).toBe(200);
        expect(JSON.parse(getResponse.body)).toStrictEqual(expectBody);
    })
});
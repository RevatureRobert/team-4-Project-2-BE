import { handler as addHandler } from "../AddOne/PostAddOne";
import { handler as updateHandler } from "./PostUpdateOne";
import { handler as getHandler } from "../GetOne/PostGetOne";

describe("updateOne", () => {
  beforeEach(async () => {
    let body = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
      Stamp: 25,
      content: `This is the post`,
      image: `no image`,
    };
    let addRequest = JSON.stringify(body);

    await addHandler({ body: addRequest });
  });
  test("Should return status 200", async () => {
    let updateBody = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
      Stamp: 25,
      content: `This is not the post`,
      image: `no image`,
    };
    let getBody = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
    };
    let expectBody = {
      REFERENCE: `user1#10`,
      TYPEID: `A#DragonBall`,
      Stamp: 25,
      content: `This is not the post`,
      image: `no image`,
    };
    let request = JSON.stringify(updateBody);
    //Update entry
    let response: any = await updateHandler({ body: request });
    //Retrieve entry
    let getRequest = JSON.stringify(getBody);
    let getResponse: any = await getHandler({ body: getRequest });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(getResponse.body)).toStrictEqual(expectBody);
  });

  test("should return a status 400", async () => {
    let updateBody = {};

    let request = JSON.stringify(updateBody);

    let response: any = await updateHandler({ body: request });

    expect(response.statusCode).toBe(400);
  });
});

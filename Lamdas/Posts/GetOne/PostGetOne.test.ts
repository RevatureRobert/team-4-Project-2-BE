import { handler as addHandler } from "../AddOne/PostAddOne";
import { handler as getHandler } from "./PostGetOne";

describe("GetOne", () => {
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
    let getBody = {
      postID: "user1_10",
      parentID: `A_DragonBall`,
    };
    let expectBody = {
      REFERENCE: `user1#10`,
      TYPEID: `A#DragonBall`,
      Stamp: 25,
      content: `This is the post`,
      image: `no image`,
    };

    let getResponse: any = await getHandler({ pathParameters: getBody });

    expect(getResponse.statusCode).toBe(200);
    console.log("Get Response", getResponse);
    expect(JSON.parse(getResponse.body)).toStrictEqual(expectBody);
  });

  test("should return a status 400", async () => {
    let getBody = {
      postID: undefined,
      parentID: `A#DragonBall`,
    };

    let getResponse: any = await getHandler({ pathParameters: { getBody } });

    expect(getResponse.statusCode).toBe(400);
  });
});

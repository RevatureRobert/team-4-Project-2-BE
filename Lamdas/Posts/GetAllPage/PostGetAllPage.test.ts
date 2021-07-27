import { handler as addHandler } from "../AddOne/PostAddOne";
import { handler as getPageHandler } from "./PostGetAllPage";

describe("GetAllPage", () => {
  beforeEach(async () => {
    let body1 = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
      Stamp: 25,
      content: `This is the post`,
      image: `no image`,
    };
    let addRequest = JSON.stringify(body1);

    await addHandler({ body: addRequest });

    let body2 = {
      postID: `user2#10`,
      parentID: `A#DragonBall`,
      Stamp: 25,
      content: `This is the post`,
      image: `no image`,
    };
    addRequest = JSON.stringify(body2);

    await addHandler({ body: addRequest });

    let body3 = {
      postID: `user3#10`,
      parentID: `A#DragonBall`,
      Stamp: 25,
      content: `This is the post`,
      image: `no image`,
    };
    addRequest = JSON.stringify(body3);

    await addHandler({ body: addRequest });

    let body4 = {
      postID: `user1#10`,
      parentID: `A#Pokemon`,
      Stamp: 25,
      content: `This is the post`,
      image: `no image`,
    };
    addRequest = JSON.stringify(body4);

    await addHandler({ body: addRequest });
  });

  test("Should return status 200 and all relavent posts", async () => {
    const body = {
      pageID: "A_DragonBall",
    };

    const expected = [
      {
        REFERENCE: `user1#10`,
        TYPEID: `A#DragonBall`,
        Stamp: 25,
        content: `This is the post`,
        image: `no image`,
      },
      {
        REFERENCE: `user2#10`,
        TYPEID: `A#DragonBall`,
        Stamp: 25,
        content: `This is the post`,
        image: `no image`,
      },
      {
        REFERENCE: `user3#10`,
        TYPEID: `A#DragonBall`,
        Stamp: 25,
        content: `This is the post`,
        image: `no image`,
      },
    ];

    let response: any = await getPageHandler({ pathParameters: body });

    expect(response.statusCode).toBe(200);
    let responseBody = JSON.parse(response.body);
    expect(responseBody).toStrictEqual(expected);
  });

  test("Should return status 400", async () => {
    const body = {
      pageID: undefined,
    };

    let response: any = await getPageHandler({ pathParameters: body });
    expect(response.statusCode).toBe(400);
  });
});

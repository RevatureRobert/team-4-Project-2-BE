import { handler as addHandler } from "../AddOne/PostAddOne";
import { handler as getAllFollowedHandler } from "./PostGetAllFollowed";

describe("GetAllFollow", () => {
  beforeEach(async () => {
    let body1 = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
      Stamp: 5,
      content: `This is the post`,
      image: `no image`,
    };
    let addRequest = JSON.stringify(body1);

    await addHandler({ body: addRequest });

    let body2 = {
      postID: `user2#10`,
      parentID: `A#DragonBall`,
      Stamp: 50,
      content: `This is the post`,
      image: `no image`,
    };
    addRequest = JSON.stringify(body2);

    await addHandler({ body: addRequest });

    let body3 = {
      postID: `user3#10`,
      parentID: `A#DragonBall`,
      Stamp: 15,
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

  test("Should return status 200", async () => {
    let body = {
      followArray: ["user1", "user2"],
    };

    let expectBody = [
      {
        REFERENCE: `user2#10`,
        TYPEID: `A#DragonBall`,
        Stamp: 50,
        content: `This is the post`,
        image: `no image`,
      },
      {
        REFERENCE: `user1#10`,
        TYPEID: `A#Pokemon`,
        Stamp: 25,
        content: `This is the post`,
        image: `no image`,
      },
      {
        REFERENCE: `user1#10`,
        TYPEID: `A#DragonBall`,
        Stamp: 5,
        content: `This is the post`,
        image: `no image`,
      },
    ];

    let request = JSON.stringify(body);
    let response: any = await getAllFollowedHandler({ body: request });

    expect(response.statusCode).toBe(200);
    let responseBody = JSON.parse(response.body);
    expect(responseBody).toStrictEqual(expectBody);
  });

  test("Should retrun status 400", async () => {
    let body = {
      followArray: [":"],
    };
    let request = JSON.stringify(body);
    let response: any = await getAllFollowedHandler({ body: request });
    expect(response.statusCode).toBe(400);
  });
});

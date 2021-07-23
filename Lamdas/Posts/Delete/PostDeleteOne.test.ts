import { handler as addHandler } from "../AddOne/PostAddOne";
import { handler as deleteHandler } from "./PostDeleteOne";

describe("Post Delete One", () => {
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
    let body = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
    };

    const request = JSON.stringify(body);
    const response: any = await deleteHandler({ body: request });

    expect(response.statusCode).toBe(200);
  });

  test("Should return status 400", async () => {
    let body = {};
    const request = JSON.stringify(body);
    const response: any = await deleteHandler({ body: request });

    expect(response.statusCode).toBe(400);
  });
});

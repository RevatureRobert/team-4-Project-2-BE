import { handler } from "./PostAddOne";
describe("PostAddOne", () => {
  test("Should return status 200", async () => {
    let body = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
      timestamp: 25,
      content: `This is the post`,
      image: `no image`,
    };
    let request = JSON.stringify(body);
    console.log(request);
    let response: any = await handler({ body: request });

    expect(response.statusCode).toBe(200);
  });

  test("Should return status 400", async () => {
    let body = {
      postID: `user1#10`,
      parentID: `A#DragonBall`,
      timestamp: undefined,
      content: `This is the post`,
      image: `no image`,
    };
    let request = JSON.stringify(body);
    console.log(request);
    let response: any = await handler({ body: request });

    expect(response.statusCode).toBe(400);
  });
});

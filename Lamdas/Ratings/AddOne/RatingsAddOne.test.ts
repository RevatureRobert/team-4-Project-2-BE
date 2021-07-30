import { handler } from "./RatingsAddOne";
describe("RatingsAddOne", () => {
  test("Should return status 200", async () => {
    let body = {
      postID: `R#user1`,
      parentID: `A#DragonBall`,
      rating: 3
    };
    let request = JSON.stringify(body);

    let response: any = await handler({ body: request });

    expect(response.statusCode).toBe(200);
  });

  test("Should return status 400", async () => {
    let body = {
      postID: `R#user1`,
      parentID: `A#DragonBall`,
      rating: 2.1
    };
    let request = JSON.stringify(body);

    let response: any = await handler({ body: request });

    expect(response.statusCode).toBe(400);
  });
});

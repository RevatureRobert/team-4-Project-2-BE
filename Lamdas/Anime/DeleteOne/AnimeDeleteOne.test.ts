import { handler as addHandler } from "../AddOne/AnimeAddOne";
import { handler as deleteHandler } from "./AnimeDeleteOne";

describe("Post Delete One", () => {
  beforeEach(async () => {
    let body = {
      REFERENCE: `0`,
      parentID: `A#DragonBall`,
      bio: 'something',
      image: 'literally anything.jpeg',
      genre: 'action',
    };
    let addRequest = JSON.stringify(body);

    await addHandler({ body: addRequest });
  });
  test("Should return status 200", async () => {
    let body = {
        parentID: `A_DragonBall`,
    };

    const response: any = await deleteHandler({pathParameters: body});
    expect(response.statusCode).toBe(200);
  });

  test("Should return status 400", async () => {
    let body = {};

    const response: any = await deleteHandler({pathParameters: body});
    expect(response.statusCode).toBe(400);
  });
});

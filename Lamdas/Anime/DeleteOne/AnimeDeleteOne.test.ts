import { handler as addHandler } from "../AddOne/AnimeAddOne";
import { handler as deleteHandler } from "./AnimeDeleteOne";

describe("Post Delete One", () => {
  beforeEach(async () => {
    let body = {
      REFERENCE: `0`,
      parentID: `A#DragonBall`,
    
    };
    let addRequest = JSON.stringify(body);

    await addHandler({ body: addRequest });
  });
  test("Should return status 200", async () => {
    let body = {
     REFERENCE: `0`,
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

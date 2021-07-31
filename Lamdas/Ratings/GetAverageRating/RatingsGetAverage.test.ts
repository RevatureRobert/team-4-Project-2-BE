import { handler } from "./RatingsGetAverage";
import { handler as addHandler } from "../AddOne/RatingsAddOne";
describe("RatingsGetAverage", () => {
  beforeEach(async () => {
    //should count
    let body1 = {
      postID: `R#user1`,
      parentID: `A#DragonBall`,
      rating: 1
    };
    let addRequest = JSON.stringify(body1);

    await addHandler({ body: addRequest });
    //should count
    let body = {
      postID: `R#user2`,
      parentID: `A#DragonBall`,
      rating: 5
    };
    let request = JSON.stringify(body);
    console.log(request);
    await addHandler({ body: request });

    //wrong anime, shouldn't count, or replace the actual anime rating
    let body2 = {
      postID: `R#user2`,
      parentID: `A#AttackOnTitan`,
      rating: 1
    };
    addRequest = JSON.stringify(body2);

    await addHandler({ body: addRequest });
    //bad rating, shouldn't count
    let body3 = {
      postID: `R#user4`,
      parentID: `A#DragonBall`,
      rating: 1.4
    };
    addRequest = JSON.stringify(body3);

    await addHandler({ body: addRequest });
    //should work
    let body4 = {
      postID: `R#user5`,
      parentID: `A#DragonBall`,
      rating: 2
    };
    addRequest = JSON.stringify(body4);

    await addHandler({ body: addRequest });
    //should overwrite previous call
    let body5 = {
      postID: `R#user1`,
      parentID: `A#DragonBall`,
      rating: 2
    };
    addRequest = JSON.stringify(body5);

    await addHandler({ body: addRequest });

  });

  test("Should return proper average", async () => {
    let body = {
      pageID: `A#DragonBall`
    };
    let request = JSON.stringify(body);
    let response: any = await handler({ pathParameters: body });
    let responseBody = JSON.parse(response.body);
    expect(responseBody).toStrictEqual((2+2+5)/3);
  });
  test("Should return status 400", async () => {
    const body = {
      pageID: undefined,
    };

    let response: any = await handler({ pathParameters: body });
    expect(response.statusCode).toBe(400);
  });
});

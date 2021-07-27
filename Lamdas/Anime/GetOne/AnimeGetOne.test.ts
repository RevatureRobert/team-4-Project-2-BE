import { handler as addHandler } from "../AddOne/AnimeAddOne";
import { handler as getHandler } from "./AnimeGetOne";

describe("AnimeGetOne", () => {
  beforeEach(async () => {
    let body = {
      parentID: `A#DragonBall`,     
      bio: `This is the post`,
      image: `no image`,
    };
    let addRequest = JSON.stringify(body);

    await addHandler({ body: addRequest });
  });
  test("Should return status 200", async () => {
    let getBody = {      
      parentID: `A#DragonBall`,
    };
    let expectBody = {     
      REFERENCE:'0',
      TYPEID: `A#DragonBall`,      
      bio: `This is the post`,
      image: `no image`,
    };
    let getResponse: any = await getHandler({ pathParameters: getBody });
    expect(getResponse.statusCode).toBe(200);
    expect(JSON.parse(getResponse.body)).toStrictEqual(expectBody);
  });

  test("should return a status 400", async () => {
    let getBody = {
        parentID: undefined,
    };
    let getResponse: any = await getHandler({ pathParameters: getBody });
    expect(getResponse.statusCode).toBe(400);
  });
});

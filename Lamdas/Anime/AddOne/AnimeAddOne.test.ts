import{handler} from "./AnimeAddOne";

describe("AnimeAddOne", () => {
  test("Should return status 200", async () => {
    let body = {      
      parentID: `A#DragonBall`,      
      bio: `This is anime`,
      image: `no image`,
    };
    let request = JSON.stringify(body);
    console.log(request);
    let response: any = await handler({ body: request });

    expect(response.statusCode).toBe(200);
  });
});
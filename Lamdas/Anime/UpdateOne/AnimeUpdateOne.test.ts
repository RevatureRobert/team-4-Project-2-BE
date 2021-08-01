import{handler} from "./AnimeUpdate";
describe("AnimeAddOne", () => {
  test("Should return status 200", async () => {
    let body = {      
      parentID: `A#DragonBall`,     
      bio: `This is anime`,
      image: `no image`,
      genre: 'martial arts',
    };
    let request = JSON.stringify(body);
    console.log(request);
    let response: any = await handler({ body: request });

    expect(response.statusCode).toBe(200);
  });

  test("Should return status 400", async () => {
    let body = {    
      parentID: undefined,     
      bio: `This is t e post`,
      image: `no image`,
      genre: 'anything honestly',
    };
    let request = JSON.stringify(body);
    console.log(request);
    let response: any = await handler({ body: request });

    expect(response.statusCode).toBe(400);
  });
});
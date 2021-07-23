import { handler as addHandler } from "../AddOne/AnimeAddOne"
import { handler as getPageHandler } from "../GetOne/AnimeGetOne"

describe("GetAllPage", () => {
  beforeEach(async () => {
    let body1 = {
      REFERENCE: `0`,
      TYPEID: `A#DragonBall`,      
      bio: `This is the post`,
      image: `no image`,
    };
    let addRequest = JSON.stringify(body1);

    await addHandler({ body: addRequest });

    let body2 = {
        REFERENCE: `0`,
        TYPEID: `A#Pokemon`,      
        bio: `Got to catch them all again!`,
        image: `no image`,
    };
    addRequest = JSON.stringify(body2);

    await addHandler({ body: addRequest });

    let body3 = {
        REFERENCE: `0`,
        TYPEID: `A#Onepiece`,      
        bio: `pirates and stuff`,
        image: `no image`,
    };
    addRequest = JSON.stringify(body3);

    await addHandler({ body: addRequest });

    let body4 = {
        REFERENCE: `0`,
        TYPEID: `A#Demonslayer`,      
        bio: `Brother and sister try to avenge sister being turned into a demon`,
        image: `no image`,
    };
    addRequest = JSON.stringify(body4);

    await addHandler({ body: addRequest });
  });

  test("Should return status 200 and all anime info", async () => {
    const body = {
     REFERENCE: "0",
    };

    const expected = [
      {
        REFERENCE: `0`,
        TYPEID: `A#DragonBall`,        
        bio: `This is the post`,
        image: `no image`,
      },
      {
        REFERENCE: `0`,
        TYPEID: `A#Pokemon`,        
        bio: `Got to catch them all again!`,
        image: `no image`,
      },
      {
        REFERENCE: `0`,
        TYPEID: `A#Onepiece`,     
        bio: `pirates and stuff`,
        image: `no image`,
      },
      {
        REFERENCE: `0`,
        TYPEID: `A#Demonslayer`,     
        bio: `Brother and sister try to avenge sister being turned into a demon`,
        image: `no image`,
      },

    ];

    let getPageRequest = JSON.stringify(body);
    let response: any = await getPageHandler({ body: getPageRequest });

    expect(response.statusCode).toBeDefined();
    let responseBody = JSON.parse(response.body);
    expect(responseBody).toContain(JSON.stringify(expected));
  });

  test("Should return status 400", async () => {
    const body = {
      pageID: undefined,
    };

    let getPageRequest = JSON.stringify(body);
    let response: any = await getPageHandler({ body: getPageRequest });

    expect(response.statusCode).toBe(400);
  });
});

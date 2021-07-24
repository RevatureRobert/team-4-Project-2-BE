import { handler as addHandler } from "../AddOne/AnimeAddOne";
import { handler as getAnimeHandler } from "./AnimeGetAll";

describe("GetAllPage", () => {
  beforeEach(async () => {
    let body1 = {
      REFERENCE: `0`,
      parentID: `A#DragonBall`,      
      bio: `This is the post`,
      image: `no image`,
    };
    let addRequest = JSON.stringify(body1);

    await addHandler({ body: addRequest });

    let body2 = {
      REFERENCE: `0`,
      parentID: `A#Pokemon`,      
      bio: `This is the post`,
      image: `no image`,
    };
    addRequest = JSON.stringify(body2);

    await addHandler({ body: addRequest });

    let body3 = {
      REFERENCE: `0`,
      parentID: `A#DemonSlayer`,      
      bio: `This is the post`,
      image: `no image`,
    };
    addRequest = JSON.stringify(body3);

    await addHandler({ body: addRequest });

    let body4 = {
      REFERENCE: `0`,
      parentID: `A#OnePiece`,      
      bio: `This is the post`,
      image: `no image`,
    };
    addRequest = JSON.stringify(body4);

    await addHandler({ body: addRequest });
  });

  test("Should return status 200 and all anime", async () => {
    const body = {
        REFERENCE: '0',
        parentID:"A#"
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
        bio: `This is the post`,
        image: `no image`,
      },
      {
        REFERENCE: `0`,
        TYPEID: `A#DemonSlayer`,       
        bio: `This is the post`,
        image: `no image`,
      },
      {
        REFERENCE: `0`,
        TYPEID: `A#OnePiece`,       
        bio: `This is the post`,
        image: `no image`,
      },
    ];

    let getPageRequest = JSON.stringify(body);
    let response: any = await getAnimeHandler({ body: getPageRequest });
    
    expect(response.statusCode).toBe(200);
  
   
  });

});

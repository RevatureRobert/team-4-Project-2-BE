import {handler as addHandler}from'../AddOne/AnimeAddOne'
import {handler as getHandler}from './AnimeGetBySearch'

describe("GetAnimeBySearch", () => {
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
        parentID: `A#DemonSlayer`,        
        bio: `This is the post`,
        image: `no image`,
      };
      addRequest = JSON.stringify(body2);
  
      await addHandler({ body: addRequest });
  
      let body3 = {
        REFERENCE: `0`,
        parentID: `A#Pokemon`,       
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
  
    test("Should return status 200 and all searched anime", async () => {
        const body = {
          
          searchValue:"A#D",
        }
        const expected = [
          {
            
            TYPEID: `A#DragonBall`,            
           
          },
          {
            
            TYPEID: `A#DemonSlayer`,           
           
          },
        ];
        
    let getPageRequest = JSON.stringify(body);
    let response: any = await getHandler({ body: getPageRequest });
        console.log(getPageRequest)
    expect(response.statusCode).toBe(200);
    let responseBody = JSON.parse(response.body);
    expect(responseBody).toStrictEqual(expected);
  });

  test("Should return status 400", async () => {
    const body = {
      pageID: undefined,
    };

    let getPageRequest = JSON.stringify(body);
    let response: any = await getHandler({ body: getPageRequest });

    expect(response.statusCode).toBe(400);
  });
});

import * as TestCase from "./TestCase"
async function addTest(){
    test("should add and get item to table", async() => {
        await TestCase.add('2')   
    expect(await TestCase.get('2')).toEqual({id:'2'});
});
}
addTest();
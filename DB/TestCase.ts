import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "./Dynamo";

export async function get(Id:string){
const params = {
    TableName: "table",
  /*
  Convert the key JavaScript object you are retrieving to the
  required Amazon DynamoDB record. The format of values specifies
  the datatype. The following list demonstrates different
  datatype formatting requirements:
  String: "String",
  NumAttribute: 1,
  BoolAttribute: true,
  ListAttribute: [1, "two", false],
  MapAttribute: { foo: "bar" },
  NullAttribute: null
   */
  Key: {
      id:Id
    }
}

try {
    const data = await ddbDoc.send(new GetCommand(params));
    const item = data.Item;
    console.log("Success :", item);
    return item;
  } catch (err) {
    console.log("Error", err);
  }

}
export async function add(ID:string) {
    

    const params = {
        TableName: "table",
        /*
        Convert the key JavaScript object you are adding to the
        required Amazon DynamoDB record. The format of values specifies
        the datatype. The following list demonstrates different
        datatype formatting requirements:
        String: "String",
        NumAttribute: 1,
        BoolAttribute: true,
        ListAttribute: [1, "two", false],
        MapAttribute: { foo: "bar" },
        NullAttribute: null
        */
        Item: {
        id: ID,
        },
    };

    try {
        const data = await ddbDoc.send(new PutCommand(params));
        console.log("Success - item added or updated", data);
        //return data;
      } catch (err) {
        console.log("Error", err);
      }
}
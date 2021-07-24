import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const TABLE = "ScouterApp";

export const handler = async (event:any) => {
    console.log("Request event: ", event);
    let response = {};

    let body = JSON.parse(event.body);
    
    let params = {
        TableName: TABLE,
        Key: {
            TYPEID: "U#" + body.userID,
            REFERENCE: "0",
        },
        //image, bio, wishlist[], followed[], favorites 
        UpdateExpression: "set image = :i, bio = :b, watchlist = :w, followed = :f, favorites = :a",
        ExpressionAttributeValues: {
            ":i": body.image,
            ":b": body.bio,
            ":w": body.watchlist,
            ":f": body.followed,
            ":a": body.favorites,
        },
    };
    await ddbDoc.send(new UpdateCommand(params));
    return buildResponse(200, "Successful Update to User Information");   
}
function buildResponse(statusCode: number, body: any) {
    return {
      statusCode,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  
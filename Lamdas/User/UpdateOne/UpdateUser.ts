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
        UpdateExpression: "set image = :i, bio = :b, wishlist = :w, followed = :f, favorites = :a",
        ExpressionAttributeValues: {
            ":i": body.image,
            ":b": body.bio,
            ":w": body.wishlist,
            ":f": body.followed,
            ":a": body.favorites,
        },
    };
    try {
        await ddbDoc.send(new UpdateCommand(params));
        response = buildResponse(200, "Successful Update to User Information");
    } catch(err) {
        response = buildResponse(400, "PUT command error");
        console.log(err);
    }
    return response;
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
  
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const TABLE = "ScouterApp";

export const handler = async (event:any) => {
    let response = {};

    let body = JSON.parse(event.body);
    let REFERENCE = "0";
    let image = body.image;
    let bio = body.bio;
    let watchlist = body.watchlist;
    let followed = body.followed;
    let favorites = body.favorites;

    let params = {
        TableName: TABLE,
        Item: {
            TYPEID: "U#" + body.userID,
            REFERENCE,
            image,
            bio,
            watchlist,
            followed,
            favorites,
        },
    };
    try {
        await ddbDoc.send(new PutCommand(params));
        response = buildResponse(200, "Success");
    } catch(err) {
        response = buildResponse(400, "POST command error");
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
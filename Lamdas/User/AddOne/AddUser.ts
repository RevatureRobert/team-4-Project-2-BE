import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const TABLE = "ScouterApp";

export const handler = async (event: any) => {
  let response = {};

  let body = JSON.parse(event.body);
  let REFERENCE = "0";
  let image = body.image;
  let bio = body.bio;
  let watchlist = body.watchlist;
  let followed = body.followed;
  let favorites = body.favorites;
  let userID = body.userID;

  let params = {
    TableName: TABLE,
    Item: {
      TYPEID: userID,
      REFERENCE,
      image,
      bio,
      watchlist,
      followed,
      favorites,
    },
  };
    await ddbDoc.send(new PutCommand(params));
    return buildResponse(200, "Success");
  };

function buildResponse(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify(body),
  };
}

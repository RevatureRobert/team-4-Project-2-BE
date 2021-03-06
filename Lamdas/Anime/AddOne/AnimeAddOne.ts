import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);
  let parentId = body.parentID;
  let bio = body.bio;
  let image = body.image;
  let genre = body.genre;

  let params = {
    TableName: dynamoDBTableName,
    Item: {
      REFERENCE: "0",
      TYPEID: parentId,
      bio,
      image,
      genre,
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

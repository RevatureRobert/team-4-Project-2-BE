import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);
  let postId = body.postID;
  let parentId = body.parentID;
  let rating = body.rating;
  if(!(rating === 1 || rating === 2 || rating === 3 || rating === 4 || rating === 5)){
    response = buildResponse(400, "error with command");
    return response;
  } 

  let params = {
    TableName: dynamoDBTableName,
    Item: {
      TYPEID: parentId,
      REFERENCE: postId,
      Rating: rating
    },
  };

    await ddbDoc.send(new PutCommand(params));
    response = buildResponse(200, "Success");


  return response;
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

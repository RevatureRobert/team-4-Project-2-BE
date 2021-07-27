import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = event.pathParameters;
  let postId = body.postID;
  let parentId = body.parentID;
  console.log("Get Body", body);
  let params = {
    TableName: dynamoDBTableName,
    Key: {
      TYPEID: parentId,
      REFERENCE: postId,
    },
  };
  console.log("Get Params", params);
  try {
    let data = await ddbDoc.send(new GetCommand(params));
    console.log("Get Data Item", data.Item);
    response = buildResponse(200, data.Item);
  } catch (err) {
    response = buildResponse(400, "error with command");
    console.log(err);
  }

  return response;
};

function buildResponse(statusCode: number, body: any) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(body),
  };
}

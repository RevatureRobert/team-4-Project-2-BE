import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = event.pathParameters;
  let REFERENCE = "0";
  let parentId = body.parentID && body.parentID.replace("#", "_");;

  let params = {
    TableName: dynamoDBTableName,
    Key: {
      REFERENCE,
      TYPEID: parentId,
    },
  };

  try {
    await ddbDoc.send(new DeleteCommand(params));
    response = buildResponse(200, "Success");
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
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify(body),
  };
}

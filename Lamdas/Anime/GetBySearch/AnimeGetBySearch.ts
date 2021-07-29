import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};
  let body = event.pathParameters;
  let search = body.searchValue;
  const params = {
    // Specify which items in the results are returned.
    FilterExpression: "contains(TYPEID,:atag) AND #ref =:ref",
    // Define the expression attribute value, which are substitutes for the values you want to compare.
    ExpressionAttributeValues: {
      ":ref": "0",
      ":atag": "A#",
    },
    ExpressionAttributeNames: {
      "#ref": "REFERENCE",
    },
    // Set the projection expression, which are the attributes that you want.
    ProjectionExpression: " TYPEID",
    TableName: dynamoDBTableName,
  };
  try {
    const data = await ddbDoc.send(new ScanCommand(params));
    const fData = data.Items.filter(item => item.TYPEID && item.TYPEID.toLowerCase().includes(search.toLowerCase()));
    console.log(fData);
    response = buildResponse(200, fData);
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

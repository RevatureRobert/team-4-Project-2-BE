import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const TABLE = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  // instantiate empty object
  let response = {};

  // convert body param in JSON to object
  let body = event.pathParameters;
  console.log(`Get body: \n`, body);

  let params = {
    TableName: TABLE,
    Key: {
      TYPEID: "U#" + body.userID,
      REFERENCE: "0",
    },
  };
  console.log("Get Params", params);
  let data = await ddbDoc.send(new GetCommand(params));
  response = buildResponse(200, data.Item);
  return response;
};

//handling response to GET command
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

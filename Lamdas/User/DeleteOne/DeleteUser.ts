import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const TABLE = "ScouterApp";

export const handler = async (event: any) => {
    console.log("Request Event: ", event);
    let response = {};

    let body = JSON.parse(event.body);

    let params = {
        TableName: TABLE,
        Key : {
            TYPEID: "U#" + body.userID,
            REFERENCE: "0",
        },
    };
    await ddbDoc.send(new DeleteCommand(params));
    return buildResponse(200, "Success - User deleted");
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
  
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "DB/Dynamo";

const TABLE = "ScouterApp";

export const handler = async (event: any) => {
    console.log("Request Event: ", event);
    let response = {};

    let body = JSON.parse(event.body);
    let uid = body.userID;

    let params = {
        TableName: TABLE,
        Key : {
            TYPEID: "U#" + uid,
            REFERENCE: "0",
        },
    };
    try {
        await ddbDoc.send(new DeleteCommand(params));
        response = buildResponse(200, "Success - User deleted");
    } catch(err){
        response = buildResponse(400, "DELETE command error");
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
  
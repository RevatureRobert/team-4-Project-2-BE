import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "DB/Dynamo";

const TABLE = "ScouterApp";

export const handler = async (event: any) => {
    console.log("Request event: ", event);
    // instantiate empty object
    let response = {};

    // convert body param in JSON to object 
    let body = JSON.parse(event.body);
    let uid = body.userID;
    console.log(`Get body: \n`, body);

    let params = {
        TableName: TABLE,
        Key: {
            TYPEID: "U#" + uid,
            REFERENCE: "0",
        },
    };
    console.log("Get Params", params);
    try{
       let data = await ddbDoc.send(new GetCommand(params));
       response = buildResponse(200, data.Item); 
    } catch(err){
        //if user error
        response = buildResponse(400, "GET command error");
        console.log(err);
    }
    return response;
}

//handling response to GET command
function buildResponse(statusCode: number, body: any) {
    return {
      statusCode,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  
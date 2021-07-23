import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbDoc } from "DB/Dynamo";

const TABLE = "ScouterApp";
/*
export const handler = async (event:any) => {
    console.log("Request event: ", event);
    let response = {};
    
    let body = JSON.parse(event.body);

    let uid = body.userID;
    console.log(`Get body: \n`, body);

    let params = {
        TableName: TABLE,

    }
}
*/
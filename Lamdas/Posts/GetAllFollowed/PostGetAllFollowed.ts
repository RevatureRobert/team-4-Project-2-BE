import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { ddbDoc } from "../../../DB/Dynamo";

const dynamoDBTableName = "ScouterApp";

export const handler = async (event: any) => {
  console.log("Request event: ", event);
  let response = {};

  let body = JSON.parse(event.body);

  let filterString: string = "";

  let postIds: any[] = body.followArray;
  let expressionValue: Object = {};
  postIds.forEach((user) => {
    filterString += `contains(#ref, :${user}) OR `;
    expressionValue[`:${user}`] = user;
  });

  filterString = filterString.substring(0, filterString.length - 4);

  let params = {
    TableName: dynamoDBTableName,
    FilterExpression: filterString,
    ExpressionAttributeNames: {
      "#ref": "REFERENCE",
    },
    ExpressionAttributeValues: expressionValue,
  };
  console.log("Params", params);
  try {
    let data = await ddbDoc.send(new ScanCommand(params));
    let sortFn = (a, b) => {
      if (a.Stamp > b.Stamp) {
        return -1;
      } else {
        return 1;
      }
    };
    let sorted = [...data.Items].sort(sortFn);
    response = buildResponse(200, sorted);
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
    },
    body: JSON.stringify(body),
  };
}

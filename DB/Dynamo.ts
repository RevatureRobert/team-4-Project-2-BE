import {DynamoDBClient} from "@aws-sdk/client-dynamodb"
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb"
const REGION:string = "us-east-2"
const ddb:DynamoDBClient = new DynamoDBClient({region: REGION})

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};

const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};

let ddbConfig = {...ddb.config.credentials,region: REGION};
let jestConfig = {
  convertEmptyValues: true,
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
};

const config = jestConfig ? jestConfig:ddbConfig;

const translateConfig = { marshallOptions, unmarshallOptions };
const ddbTest:DynamoDBClient = new DynamoDBClient(config);
const ddbDoc = DynamoDBDocumentClient.from(ddbTest, translateConfig);




export {ddbDoc};

import { ddbDoc } from './DB/Dynamo'

afterAll(() => {
    ddbDoc.destroy();
  }); 
import { https } from 'firebase-functions';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { issueTransfer, issueReprioritized, estimateCleared, estimateSet } from './webhookHandlers';
import Webhook from './types/Webhook';

const app = express()

app.use(bodyParser.urlencoded({extended: true}));

app.post('/', async (req: Request, res: Response) => {
  const body = req.body as Webhook;
  
  try {
    const response = await (() => {
      switch (body.type) {
        case 'issue_transfer':
          return issueTransfer(body);
        case 'issue_reprioritized':
          return issueReprioritized(body);
        case 'estimate_cleared':
          return estimateCleared(body);
        case 'estimate_set':
          return estimateSet(body);
        default:
          return null;
      }
    })()

    if (response) {
      const responseBody = await response.text();

      console.log(`Recieved ${response.status} (${response.statusText}) from ${response.url}`, responseBody);

      return res.json({
        success: true,
        error: false,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "invalid hook",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "an error occured",
    });
  }
});

export const hook = https.onRequest(app);

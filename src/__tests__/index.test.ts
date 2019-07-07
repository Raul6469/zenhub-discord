// tslint:disable-next-line:no-implicit-dependencies
import request from 'supertest';

import { config } from 'firebase-functions';
jest.mock('firebase-functions');
const mockedConfig = <jest.Mock<any>>config;

import * as webhookHandlers from '../webhookHandlers';

const issueTransferStub = jest.spyOn(webhookHandlers, 'issueTransfer');
const issueReprioritizedStub = jest.spyOn(webhookHandlers, 'issueReprioritized');
const estimateSetStub = jest.spyOn(webhookHandlers, 'estimateSet');
const estimateClearedStub = jest.spyOn(webhookHandlers, 'estimateCleared');

import { app } from '../index';

describe("/hook", () => {
  const token = 'UNSAFE_TOKEN';

  beforeAll(() => {
    mockedConfig.mockReturnValue({
      webhook: {
        token,
      },
    });
  });

  afterEach(() => {
    issueTransferStub.mockReset();
    issueReprioritizedStub.mockReset();
    estimateSetStub.mockReset();
    estimateClearedStub.mockReset();
  });

  it('should call issueTransfer when type is "issue_transfer"', async () => {
    issueTransferStub.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      url: 'http://mockedUrl',
      text: () => 'mocked response',
    } as any);

    await request(app)
      .post(`/?token=${token}`)
      .send('type=issue_transfer')
      .expect(200)
      .expect({
        success: true,
        error: false,
      });

    expect(issueTransferStub).toHaveBeenCalledWith({ type: 'issue_transfer' });
    expect(issueTransferStub).toHaveBeenCalledTimes(1);
    expect(issueReprioritizedStub).toHaveBeenCalledTimes(0);
    expect(estimateClearedStub).toHaveBeenCalledTimes(0);
    expect(estimateSetStub).toHaveBeenCalledTimes(0);
  });

  it('should call issueReprioritized when type is "issue_reprioritized"', async () => {
    issueReprioritizedStub.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      url: 'http://mockedUrl',
      text: () => 'mocked response',
    } as any);

    await request(app)
      .post(`/?token=${token}`)
      .send('type=issue_reprioritized')
      .expect(200)
      .expect({
        success: true,
        error: false,
      });

    expect(issueReprioritizedStub).toHaveBeenCalledWith({ type: 'issue_reprioritized' });
    expect(issueTransferStub).toHaveBeenCalledTimes(0);
    expect(issueReprioritizedStub).toHaveBeenCalledTimes(1);
    expect(estimateClearedStub).toHaveBeenCalledTimes(0);
    expect(estimateSetStub).toHaveBeenCalledTimes(0);
  });

  it('should call estimateSet when type is "estimate_set"', async () => {
    estimateSetStub.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      url: 'http://mockedUrl',
      text: () => 'mocked response',
    } as any);

    await request(app)
      .post(`/?token=${token}`)
      .send('type=estimate_set')
      .expect(200)
      .expect({
        success: true,
        error: false,
      });

    expect(estimateSetStub).toHaveBeenCalledWith({ type: 'estimate_set' });
    expect(issueTransferStub).toHaveBeenCalledTimes(0);
    expect(issueReprioritizedStub).toHaveBeenCalledTimes(0);
    expect(estimateClearedStub).toHaveBeenCalledTimes(0);
    expect(estimateSetStub).toHaveBeenCalledTimes(1);
  });

  it('should call estimateCleared when type is "estimate_cleared"', async () => {
    estimateClearedStub.mockResolvedValue({
      status: 200,
      statusText: 'OK',
      url: 'http://mockedUrl',
      text: () => 'mocked response',
    } as any);

    await request(app)
      .post(`/?token=${token}`)
      .send('type=estimate_cleared')
      .expect(200)
      .expect({
        success: true,
        error: false,
      });

    expect(estimateClearedStub).toHaveBeenCalledWith({ type: 'estimate_cleared' });
    expect(issueTransferStub).toHaveBeenCalledTimes(0);
    expect(issueReprioritizedStub).toHaveBeenCalledTimes(0);
    expect(estimateClearedStub).toHaveBeenCalledTimes(1);
    expect(estimateSetStub).toHaveBeenCalledTimes(0);
  });

  it('should return 400 and not call any hooks with invalid type', async () => {
    await request(app)
      .post(`/?token=${token}`)
      .send('type=invalid')
      .expect(400)
      .expect({
        success: false,
        error: "invalid hook",
      });

    expect(issueTransferStub).toHaveBeenCalledTimes(0);
    expect(issueReprioritizedStub).toHaveBeenCalledTimes(0);
    expect(estimateClearedStub).toHaveBeenCalledTimes(0);
    expect(estimateSetStub).toHaveBeenCalledTimes(0);
  });

  it('should return 401 if no token is passed', async () => {
    await request(app)
      .post('/')
      .expect(401)
      .expect({
        success: false,
        error: '[Unauthorized] No token passed',
      });

    expect(issueTransferStub).toHaveBeenCalledTimes(0);
    expect(issueReprioritizedStub).toHaveBeenCalledTimes(0);
    expect(estimateClearedStub).toHaveBeenCalledTimes(0);
    expect(estimateSetStub).toHaveBeenCalledTimes(0);
  });

  it('should return 401 if invalid token is passed', async () => {
    await request(app)
      .post('/?token=INVALID')
      .expect(401)
      .expect({
        success: false,
        error: '[Unauthorized] No token passed',
      });

    expect(issueTransferStub).toHaveBeenCalledTimes(0);
    expect(issueReprioritizedStub).toHaveBeenCalledTimes(0);
    expect(estimateClearedStub).toHaveBeenCalledTimes(0);
    expect(estimateSetStub).toHaveBeenCalledTimes(0);
  });
});

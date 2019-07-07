// tslint:disable-next-line:no-implicit-dependencies
import { config } from 'firebase-functions';
jest.mock('firebase-functions');
const mockedConfig = <jest.Mock<any>>config;

import fetch from 'node-fetch';
jest.mock('node-fetch');
const mockedFetch = <jest.Mock<typeof fetch>><unknown>fetch;

import sendHook from '../../utils/sendHook';



describe("sendHook", () => {
  it.only('should call fetch with response from config"', async () => {
    const fakeEndpoint = 'https://fakeEndpoint';
    const fakeMessage = 'fake message' as any;

    mockedConfig.mockReturnValue({
      discord: {
        webhook: fakeEndpoint,
      },
    });

    const expectedConfig = {
      method: 'post',
      body: JSON.stringify(fakeMessage),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await sendHook(fakeMessage);

    expect(mockedConfig).toBeCalled();
    expect(mockedFetch).toHaveBeenCalledWith(fakeEndpoint, expectedConfig);    
  });
});

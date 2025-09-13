import { TextEncoder, TextDecoder } from 'util';
import { webcrypto } from 'crypto';
import { MessagePort } from 'worker_threads';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
global.crypto = webcrypto as any;
global.MessagePort = MessagePort as any;

const { ReadableStream } = require('web-streams-polyfill');
global.ReadableStream = ReadableStream;

const undici = require('undici');

global.Request = undici.Request;
global.Response = undici.Response;
global.fetch = undici.fetch;

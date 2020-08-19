import { Transform } from 'stream';
import { StringDecoder } from 'string_decoder';

export class ReverseTransform extends Transform {
  constructor(options) {
    super(options);
    this._decoder = new StringDecoder('utf-8');
  }

  _transform(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
    }
    chunk = this._formatChunk(chunk);
    callback(null, chunk);
  }

  _formatChunk(chunk) {
    return `${(chunk).split('').reverse().join('')}\n`;
  }
}

const { Transform } = require('stream');
const ChildProcess = require('child_process');

class FfmpegStream extends Transform {
  constructor(options) {
    super();
    this.ffmpeg = ChildProcess.spawn(FfmpegStream.selectFfmpegCommand(), options);
  }

  static selectFfmpegCommand() {
    try {
      return require('ffmpeg-binaries').ffmpegPath();
    } catch (err) {
      for (const command of ['ffmpeg', 'avconv', './ffmpeg', './avconv']) {
        if (!ChildProcess.spawnSync(command, ['-h']).error) return command;
      }
      throw new Error('FFMPEG not found');
    }
  }

  _transform(chunk, encoding, done) {

  }
}

module.exports = FfmpegStream;

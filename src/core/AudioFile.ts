class PauseState {
  paused = false;

  pausedTime = 0;
}

export default class AudioFile {
  file: File;

  ctx: AudioContext;

  buffer?: AudioBuffer;

  bufferSourceNode?: AudioBufferSourceNode;

  currentSeekTime = 0;

  currentPlaybackTime = 0;

  pauseState = new PauseState();

  constructor(file: File, audioContext?: AudioContext) {
    this.file = file;
    this.ctx = audioContext || new AudioContext();
  }

  async _loadFile() {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: Event) => {
        const encoded = (e.target as FileReader).result as Float32Array;
        this.ctx.decodeAudioData(encoded).then((decoded) => {
          this.buffer = decoded;
          console.log('Saved to buffer');
          resolve(this.buffer);
        });
      };
      reader.onerror = () => {
        console.error('Unable to read file');
        reject(new Error('Unable to read file'));
      };

      reader.readAsArrayBuffer(this.file);
    });
  }

  async init() {
    await this._loadFile();

    return this;
  }

  play(time?: number) {
    if (this.buffer === undefined) return;

    this.bufferSourceNode = this.ctx.createBufferSource();
    this.bufferSourceNode.buffer = this.buffer;
    this.bufferSourceNode.connect(this.ctx.destination);
    time ? this.bufferSourceNode.start(0, time) : this.bufferSourceNode.start();
    console.log('play');

    this.pauseState.paused = false;
  }

  pause() {
    // Not currently paused, so pause
    this.pauseState.pausedTime = this.ctx.currentTime;
    if (this.bufferSourceNode !== undefined) this.bufferSourceNode.stop();
    this.pauseState.paused = true;
  }

  resume() {
    // Currently paused, so resume
    this.pauseState.paused ? this.play(this.pauseState.pausedTime) : this.play();
  }

  pauseResume() {
    this.pauseState.paused ? this.resume() : this.pause();
  }

  stop() {
    if (this.bufferSourceNode !== undefined) this.bufferSourceNode.stop();
  }
}

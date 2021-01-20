
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
    this.ctx = audioContext ? audioContext : new AudioContext();
  }

  async _loadFile() {
    return new Promise((resolve, reject) => {const reader = new FileReader();
      reader.onload = (e: Event) => {
        resolve()
        const encoded = (e.target as FileReader).result as Float32Array;
        this.ctx.decodeAudioData(encoded)
          .then(decoded => { this.buffer = decoded; console.log('Saved to buffer'); });
      };
      
      reader.readAsArrayBuffer(this.file);
    });

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target.result.toString()
          .split('')
          .map(bit => bit.codePointAt(0).toString(16).toUpperCase())
          .join(''));
      };
      reader.onerror = () => {
        reject(new Error('Unable to read..'));
      };
      reader.readAsBinaryString(blob.slice(0, 4));
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
    console.log("play");

    this.pauseState.paused = false;
  }

  pause() {
    // Not currently paused, so pause
    this.pauseState.pausedTime = this.ctx.currentTime;
    this.bufferSourceNode?.stop();
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
    this.bufferSourceNode?.stop();
  }

}
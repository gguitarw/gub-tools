
class PauseState {
  paused = false;
  pausedTime = 0;
}

export default class AudioFile {
  ctx: AudioContext;

  buffer!: AudioBuffer;
  bufferSourceNode: AudioBufferSourceNode;

  currentSeekTime = 0;
  currentPlaybackTime = 0;

  pauseState = new PauseState();

  constructor(file: File, audioContext?: AudioContext) {
    this.ctx = audioContext ? audioContext : new AudioContext();

    const reader = new FileReader();
    reader.onload = (e: Event) => {
      const encoded = (e.target as FileReader).result as Float32Array;
      this.ctx.decodeAudioData(encoded)
        .then(decoded => { this.buffer = decoded });
    };

    reader.readAsArrayBuffer(file);
    
    this.bufferSourceNode = this.ctx.createBufferSource();
    this.bufferSourceNode.buffer = this.buffer;
  }

  play(time?: number) {
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
    this.bufferSourceNode.stop();
    this.pauseState.paused = true;
    console.log("pause");
  }

  resume() {
    // Currently paused, so resume
    this.pauseState.paused ? this.play(this.pauseState.pausedTime) : this.play();
    console.log("resume");
  }

  pauseResume() {
    this.pauseState.paused ? this.resume() : this.pause();
  }

  stop() {
    this.bufferSourceNode.stop();
    console.log("stop");
  }

}

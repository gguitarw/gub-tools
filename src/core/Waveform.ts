export default class WaveformCache {
  // resolution: number;
  data: Float32Array;

  constructor(buffer: AudioBuffer, channel = 0) {
    this.data = buffer.getChannelData(channel);
  }
}

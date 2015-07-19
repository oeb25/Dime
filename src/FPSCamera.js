import { Group } from 'three';

export default class FPSCamera extends Group {

  constructor(canvas) {
    super();

    canvas.addEventListener('mousemove', ::this.handleMouse);

    this._rotation = {
      x: 0,
      y: 0
    };

    this._listeners = [];
  }

  handleMouse({ movementX, movementY }) {
    this._rotation = {
      x: this._rotation.x - movementX,
      y: this._rotation.y - movementY
    };

    this._listeners.map(cb => cb(this._rotation));
  }

  onRotate(cb) {
    this._listeners.push(cb);
  }

}

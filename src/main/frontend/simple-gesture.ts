const FREQUENCY = 20;
const MIN_MOUSEMOVE = 20;
const DIRECTIONS = 8;

type GestureDefinition = { pattern: string; maxDistance?: number } | string;

const asGestureDefinition = (value: GestureDefinition): { pattern: string; maxDistance?: number } => {
  if (typeof value === 'string') {
    return { pattern: value };
  }
  return value ?? { pattern: '' };
};

const levenshtein = (a: string, b: string): number => {
  if (a === b) {
    return 0;
  }
  if (a.length === 0) {
    return b.length;
  }
  if (b.length === 0) {
    return a.length;
  }

  const v0 = new Array<number>(b.length + 1);
  const v1 = new Array<number>(b.length + 1);

  for (let i = 0; i < v0.length; i += 1) {
    v0[i] = i;
  }

  for (let i = 0; i < a.length; i += 1) {
    v1[0] = i + 1;

    for (let j = 0; j < b.length; j += 1) {
      const cost = a[i] === b[j] ? 0 : 1;
      v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
    }

    for (let j = 0; j < v0.length; j += 1) {
      v0[j] = v1[j];
    }
  }

  return v1[b.length];
};

class SimpleGestureElement extends HTMLElement {
  private _gestures: { pattern: string; maxDistance?: number }[] = [];
  private _maxDistance = 20;
  private _recordMode = false;
  private _normalizing = false;
  private activePointerId: number | null = null;
  private moving = false;
  private lastX = 0;
  private lastY = 0;
  private moved = '';
  private lastMove = -1;
  private lastMoveTime = 0;

  private readonly handlePointerDown = (event: PointerEvent) => {
    this.activePointerId = event.pointerId;
    this.startGesture(event.clientX, event.clientY);
  };

  private readonly handlePointerMove = (event: PointerEvent) => {
    if (!this.moving || this.activePointerId !== event.pointerId) {
      return;
    }
    this.handleMove(event.clientX, event.clientY);
  };

  private readonly handlePointerUp = (event: PointerEvent) => {
    if (this.activePointerId !== event.pointerId) {
      return;
    }
    this.finishGesture(event.clientX, event.clientY);
  };

  private readonly handlePointerCancel = (event: PointerEvent) => {
    if (this.activePointerId !== event.pointerId) {
      return;
    }
    this.finishGesture(event.clientX, event.clientY);
  };

  set gestures(value: GestureDefinition[] | string) {
    let parsed: GestureDefinition[] = [];
    if (Array.isArray(value)) {
      parsed = value;
    } else if (typeof value === 'string') {
      try {
        const decoded = JSON.parse(value);
        if (Array.isArray(decoded)) {
          parsed = decoded as GestureDefinition[];
        }
      } catch (error) {
        parsed = [];
      }
    }
    this._gestures = parsed.map(asGestureDefinition).filter((item) => !!item.pattern);
  }

  set maxDistance(value: number) {
    const parsed = Number(value);
    this._maxDistance = Number.isFinite(parsed) ? parsed : 20;
  }

  set recordMode(value: boolean) {
    this._recordMode = Boolean(value);
  }

  set normalizing(value: boolean) {
    this._normalizing = Boolean(value);
  }

  connectedCallback() {
    this.style.display = 'block';
    this.style.width = '0';
    this.style.height = '0';
    this.style.pointerEvents = 'none';
    window.addEventListener('pointerdown', this.handlePointerDown, { passive: true });
    window.addEventListener('pointermove', this.handlePointerMove, { passive: true });
    window.addEventListener('pointerup', this.handlePointerUp, { passive: true });
    window.addEventListener('pointercancel', this.handlePointerCancel, { passive: true });
  }

  disconnectedCallback() {
    window.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerCancel);
  }

  private startGesture(x: number, y: number) {
    this.moving = true;
    this.moved = '';
    this.lastMove = -1;
    this.lastX = x;
    this.lastY = y;
    this.lastMoveTime = performance.now();
  }

  private finishGesture(x: number, y: number) {
    if (!this.moving) {
      return;
    }
    this.moving = false;
    this.handleMove(x, y, true);
    this.matchGesture();
    this.activePointerId = null;
  }

  private handleMove(x: number, y: number, force = false) {
    const now = performance.now();
    if (!force && now - this.lastMoveTime < FREQUENCY) {
      return;
    }
    this.lastMoveTime = now;
    this.addPoint(x, y);
  }

  private addPoint(x: number, y: number) {
    const dx = x - this.lastX;
    const dy = y - this.lastY;
    const distanceSquared = dx * dx + dy * dy;
    const threshold = MIN_MOUSEMOVE * MIN_MOUSEMOVE;

    if (distanceSquared >= threshold) {
      this.addMove(dx, dy);
      this.lastX = x;
      this.lastY = y;
    }
  }

  private addMove(dx: number, dy: number) {
    let sector = Math.round(Math.atan2(dy, dx) * (DIRECTIONS / (2 * Math.PI)));
    if (sector < 0) {
      sector += DIRECTIONS;
    }
    if (!this._normalizing || this.lastMove !== sector) {
      this.moved += sector.toString();
      this.lastMove = sector;
    }
  }

  private matchGesture() {
    if (!this.moved) {
      return;
    }

    let bestDistance = Number.POSITIVE_INFINITY;
    let bestGesture: { pattern: string; maxDistance?: number } | null = null;

    for (const entry of this._gestures) {
      const candidate = asGestureDefinition(entry);
      if (!candidate.pattern) {
        continue;
      }
      const allowedDistance = Number.isFinite(candidate.maxDistance ?? NaN)
        ? (candidate.maxDistance as number)
        : this._maxDistance;
      const distance = levenshtein(candidate.pattern, this.moved);
      if (distance <= allowedDistance && distance < bestDistance) {
        bestGesture = candidate;
        bestDistance = distance;
      }
    }

    if (this._recordMode || bestGesture) {
      const matched = bestGesture?.pattern ?? null;
      const distance = bestGesture ? bestDistance : Number.MAX_SAFE_INTEGER;
      this.dispatchEvent(
        new CustomEvent('simple-gesture-detected', {
          detail: {
            matched,
            moved: this.moved,
            distance,
            recordMode: this._recordMode,
          },
          bubbles: true,
          composed: true,
        }),
      );
    }
  }
}

customElements.define('simple-gesture', SimpleGestureElement);

'use client';
import React from 'react';

type XYZ = [number, number, number];
type XY  = [number, number];

function ChapterRow({ startTime, title, color, isActive, onClick }: {
  startTime: number; title: string; color: string; isActive: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);
  const timeStr = `${Math.floor(startTime / 60)}:${String(startTime % 60).padStart(2, '0')}`;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        background: isActive ? 'rgba(200,169,110,.10)' : hovered ? 'rgba(240,237,232,.05)' : 'transparent',
        borderLeft: isActive ? '2px solid #C8A96E' : '2px solid transparent',
      }}
    >
      <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: isActive ? color : '#8A8480', fontWeight: isActive ? 500 : 400 }}>{title}</span>
      <span style={{ fontSize: 11, color: '#4A4643', fontVariantNumeric: 'tabular-nums' }}>{timeStr}</span>
    </div>
  );
}

interface Props { autoplay?: boolean; heroMode?: boolean; }
interface State { t: number; playing: boolean; showChapters: boolean; }

export default class LostTriangleAnimation extends React.Component<Props, State> {
  END = 88;
  S   = 92;
  cx  = 960;
  cy  = 600;
  el  = 26 * Math.PI / 180;
  GU  = 1.6;
  az0 = -32 * Math.PI / 180;

  C = {
    grid: '#4A90D9', axis: '#4A90D9', cyan: '#4A90D9', red: '#E0349E',
    gold: '#C8A96E', white: '#F0EDE8', green: '#3CCB8E',
    titleCyan: '#7FB2E6', titleRed: '#F05BB5', titleGold: '#D8BE8F',
    labelCyan: '#A9CDEE', labelRed: '#F58FCF', labelGold: '#E3D0AC',
    magenta: '#E0349E', titleMag: '#F05BB5', labelMag: '#F58FCF',
  };

  P: Record<string, XYZ>;
  grid: [XYZ, XYZ][];
  circle: XYZ[];

  stage: HTMLDivElement | null = null;
  _az  = 0;
  _k   = 0;
  _raf = 0;
  _fit?: () => void;
  _last = 0;
  _sv   = 0;
  _kbd: ((e: KeyboardEvent) => void) | undefined;

  constructor(props: Props) {
    super(props);
    this.state = { t: 0, playing: false, showChapters: false };

    const g = this.GU, r2 = Math.sqrt(2);
    this.P = {
      O:   [0,  0,  0],
      U:   [g,  0,  0],
      Dg:  [g,  g,  0],
      T:   [g,  g,  r2 * g],
      MU:  [-g, 0,  0],
      MDg: [-g, g,  0],
      P2:  [-g, g,  r2 * g],
    };

    this.grid = [];
    const N = 5;
    for (let i = -N; i <= N; i++) {
      this.grid.push([[i, -N, 0], [i, N, 0]]);
      this.grid.push([[-N, i, 0], [N, i, 0]]);
    }

    this.circle = [];
    const R = 3.4;
    for (let k = 0; k <= 64; k++) {
      const a = (2 * Math.PI * k) / 64;
      this.circle.push([R * Math.cos(a), R * Math.sin(a), 0]);
    }
  }

  componentDidMount() {
    if (this.props.heroMode) {
      this.setState({ playing: true });
    } else {
      const saved = parseFloat(localStorage.getItem('lt_t') || '');
      if (!isNaN(saved) && saved > 0 && saved < this.END) {
        this.setState({ t: saved });
      } else if (this.props.autoplay) {
        this.setState({ playing: true });
      }
    }

    this.fit();
    this._fit = () => this.fit();
    window.addEventListener('resize', this._fit);

    this._last = performance.now();
    const loop = (now: number) => {
      const dt = (now - this._last) / 1000;
      this._last = now;
      if (this.state.playing) {
        let nt = this.state.t + dt;
        if (nt >= this.END) {
          if (this.props.heroMode) {
            nt = 0;
            this.setState({ t: nt });
          } else {
            nt = this.END;
            this.setState({ t: nt, playing: false });
          }
        } else {
          this.setState({ t: nt });
        }
        if (!this.props.heroMode && Math.floor(nt * 4) !== this._sv) {
          this._sv = Math.floor(nt * 4);
          localStorage.setItem('lt_t', nt.toFixed(2));
        }
      }
      this._raf = requestAnimationFrame(loop);
    };
    this._raf = requestAnimationFrame(loop);

    this._kbd = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.code === 'Space') { e.preventDefault(); this.setState(s => ({ playing: !s.playing })); }
      if (e.code === 'ArrowRight') this.setState(s => ({ t: Math.min(s.t + 5, this.END), playing: false }));
      if (e.code === 'ArrowLeft')  this.setState(s => ({ t: Math.max(s.t - 5, 0), playing: false }));
      if (e.code === 'KeyR') this.setState({ t: 0, playing: true });
    };
    window.addEventListener('keydown', this._kbd);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this._raf);
    if (this._fit) window.removeEventListener('resize', this._fit);
    if (this._kbd) window.removeEventListener('keydown', this._kbd);
  }

  fit() {
    if (!this.stage) return;
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    this.stage.style.transform = `translate(-50%,-50%) scale(${s})`;
  }

  sm(t: number, a: number, b: number) {
    if (b <= a) return t >= b ? 1 : 0;
    let e = (t - a) / (b - a);
    e = e < 0 ? 0 : e > 1 ? 1 : e;
    return e * e * (3 - 2 * e);
  }

  fio(t: number, a: number, b: number, c: number, d: number) {
    return this.sm(t, a, b) * (1 - this.sm(t, c, d));
  }

  proj(p: XYZ): XY {
    const a = this._az, ce = Math.cos(a), se = Math.sin(a);
    const xa = p[0] * ce - p[1] * se;
    const ya = p[0] * se + p[1] * ce;
    const za = p[2];
    const zb = ya * Math.sin(this.el) + za * Math.cos(this.el);
    return [this.cx + xa * this.S, this.cy - zb * this.S];
  }

  lp2(A: XY, B: XY, k: number): XY {
    return [A[0] + (B[0] - A[0]) * k, A[1] + (B[1] - A[1]) * k];
  }

  lp3(a: XYZ, b: XYZ, k: number): XYZ {
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
  }

  seg(p0: XYZ, p1: XYZ, prog: number, color: string, w: number, o: { dash?: string; op?: number; glow?: boolean } = {}) {
    if (prog <= 0) return null;
    const key = 's' + this._k++;
    const A = this.proj(p0), B0 = this.proj(p1);
    const B = this.lp2(A, B0, prog);
    return (
      <line key={key} x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]}
        stroke={color} strokeWidth={w} strokeLinecap="round"
        strokeDasharray={o.dash}
        opacity={o.op == null ? 1 : o.op}
        filter={o.glow === false ? undefined : 'url(#g)'} />
    );
  }

  dot(p: XYZ, rad: number, color: string, op: number) {
    if (op <= 0) return null;
    const key = 'c' + this._k++;
    const P = this.proj(p);
    return <circle key={key} cx={P[0]} cy={P[1]} r={rad} fill={color} opacity={op} filter="url(#g)" />;
  }

  lab(p: XYZ, txt: string, color: string, op: number, o: { dx?: number; dy?: number; size?: number; italic?: boolean; w?: number; anchor?: string } = {}) {
    if (op <= 0) return null;
    const key = 'l' + this._k++;
    const P = this.proj(p);
    return (
      <text key={key} x={P[0] + (o.dx || 0)} y={P[1] + (o.dy || 0)}
        fill={color} opacity={op} fontSize={o.size || 30}
        fontFamily="'Cormorant Garamond',serif"
        fontStyle={o.italic ? 'italic' : 'normal'}
        fontWeight={o.w || 600}
        textAnchor={(o.anchor as 'middle' | 'start' | 'end') || 'middle'}
        filter="url(#g)">{txt}</text>
    );
  }

  tx(x: number, y: number, s: string, color: string, op: number, o: { size?: number; italic?: boolean; w?: number; anchor?: string; face?: string; glow?: boolean; ls?: number } = {}) {
    if (op <= 0) return null;
    const key = 'x' + this._k++;
    return (
      <text key={key} x={x} y={y} fill={color} opacity={op}
        fontSize={o.size || 34}
        fontFamily={o.face || "'Cormorant Garamond',serif"}
        fontStyle={o.italic ? 'italic' : 'normal'}
        fontWeight={o.w || 500}
        textAnchor={(o.anchor as 'middle' | 'start' | 'end') || 'middle'}
        filter={o.glow ? 'url(#g)' : undefined}
        letterSpacing={o.ls || 0}>{s}</text>
    );
  }

  arc(O3: XYZ, A3: XYZ, B3: XYZ, rad: number, prog: number, color: string, op: number) {
    if (prog <= 0 || op <= 0) return null;
    const key = 'a' + this._k++;
    const O = this.proj(O3), A = this.proj(A3), B = this.proj(B3);
    let aA = Math.atan2(A[1] - O[1], A[0] - O[0]);
    let aB = Math.atan2(B[1] - O[1], B[0] - O[0]);
    let d = aB - aA;
    while (d > Math.PI)  d -= 2 * Math.PI;
    while (d < -Math.PI) d += 2 * Math.PI;
    const aE = aA + d * prog;
    const x0 = O[0] + rad * Math.cos(aA), y0 = O[1] + rad * Math.sin(aA);
    const x1 = O[0] + rad * Math.cos(aE), y1 = O[1] + rad * Math.sin(aE);
    return (
      <path key={key} d={`M${x0} ${y0} A${rad} ${rad} 0 0 ${d > 0 ? 1 : 0} ${x1} ${y1}`}
        stroke={color} strokeWidth={2.4} fill="none" strokeDasharray="5 6"
        opacity={op} filter="url(#g)" strokeLinecap="round" />
    );
  }

  render() {
    const { t } = this.state;
    const C = this.C, P = this.P;
    const k: React.ReactNode[] = [];
    this._k = 0;

    const ROT0 = 72, ROT1 = 84;
    this._az = this.az0 + (t > ROT0 ? 2 * Math.PI * this.sm(t, ROT0, ROT1) : 0);

    const push = (e: React.ReactNode) => { if (e) k.push(e); };

    // glow filter
    push(
      <defs key="d">
        <filter id="g" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={2.4} result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    );

    // GRID
    const gOp = this.sm(t, 0.5, 4) * 0.12;
    this.grid.forEach((s, i) => {
      const A = this.proj(s[0]), B = this.proj(s[1]);
      push(<line key={'gr' + i} x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={C.grid} strokeWidth={1} opacity={gOp} />);
    });

    // rotation ground circle
    const cOp = this.fio(t, 72.5, 73.5, 85.5, 87) * 0.5;
    if (cOp > 0) {
      const pts = this.circle.map(p => this.proj(p));
      push(<polyline key="circ" points={pts.map(p => p[0] + ',' + p[1]).join(' ')} fill="none" stroke={C.green} strokeWidth={1.5} strokeDasharray="4 9" opacity={cOp} />);
    }

    // I. AXES
    push(
      <g key="ax">
        {this.seg([-5, 0, 0], [5, 0, 0],  this.sm(t, 4,   6.2), C.axis, 1.6, { glow: true, op: 0.40 })}
        {this.seg([0, -5, 0], [0, 5, 0],   this.sm(t, 5.4, 7.6), C.axis, 1.6, { glow: true, op: 0.40 })}
        {this.dot(P.O, 3.5, C.axis, this.sm(t, 5.8, 6.6) * 0.6)}
      </g>
    );

    // filled Lost Triangle (revealed at end)
    {
      const fop = this.sm(t, 63.5, 65.2) * 0.34;
      if (fop > 0) {
        const Os = this.proj(P.O), Ts = this.proj(P.T), Ds = this.proj(P.Dg);
        push(<polygon key="fillTri" points={`${Os[0]},${Os[1]} ${Ts[0]},${Ts[1]} ${Ds[0]},${Ds[1]}`} fill={`rgba(60,203,142,${fop * 0.8})`} stroke="none" />);
      }
    }

    // II. 45° DIAGONAL — unit square
    const Bv: XYZ = [0, this.GU, 0];
    push(this.seg(P.O,  P.U,  this.sm(t, 8.4,  9.2),  C.cyan, 1.8, { glow: true }));
    push(this.seg(P.U,  P.Dg, this.sm(t, 9.0,  9.8),  C.cyan, 1.8, { glow: true }));
    push(this.seg(P.Dg, Bv,   this.sm(t, 9.6,  10.4), C.cyan, 1.8, { glow: true }));
    push(this.seg(Bv,   P.O,  this.sm(t, 10.2, 11.0), C.cyan, 1.8, { glow: true }));
    {
      const dop = this.sm(t, 10.6, 11.2);
      push(this.dot(P.O, 3.6, C.cyan, dop)); push(this.dot(P.U, 3.6, C.cyan, dop));
      push(this.dot(P.Dg, 3.6, C.cyan, dop)); push(this.dot(Bv, 3.6, C.cyan, dop));
    }
    {
      const o1 = this.sm(t, 10.8, 11.4);
      push(this.lab(this.lp3(Bv, P.Dg, 0.5), '1', C.labelCyan, o1, { dy: -14, size: 27, italic: true }));
      push(this.lab(this.lp3(P.O, P.U, 0.5), '1', C.labelCyan, o1, { dy:  24, size: 27, italic: true }));
    }
    push(this.seg(P.O, P.Dg, this.sm(t, 11.4, 12.9), C.cyan, 2.6, { dash: '10 9', glow: true }));
    push(this.lab(this.lp3(P.O, P.Dg, 0.6), '√2', C.labelCyan, this.sm(t, 12.9, 13.5), { dy: 26, dx: 8, size: 30, italic: true }));
    push(this.arc(P.O, P.U, P.Dg, 40, this.sm(t, 13.3, 14.0), C.cyan, this.sm(t, 13.3, 14.0) * 0.85));
    push(this.lab(this.lp3(P.O, P.Dg, 0.17), '45°', C.labelCyan, this.sm(t, 14.0, 14.5), { dy: 18, dx: 6, size: 21, italic: true }));

    // III. THE RISE
    {
      const rStart = 18.1, rEnd = 19.0, rp = this.sm(t, rStart, rEnd);
      const tip = this.lp3(P.Dg, P.T, rp);
      push(this.seg(P.Dg, P.T, rp, C.magenta, 11, { glow: false, op: 0.22 }));
      push(this.seg(P.Dg, P.T, rp, C.magenta, 3.4, { glow: false }));
      push(this.dot(tip, 4.6, C.magenta, this.sm(t, rStart, rStart + 0.25)));
      push(this.lab(this.lp3(P.Dg, P.T, 0.5), '√2', C.labelMag, this.sm(t, rStart + 0.7 * (rEnd - rStart), rEnd), { dx: 26, size: 30, italic: true }));
    }

    // IV. SUNDIAL LINE
    push(this.seg(P.O, P.T, this.sm(t, 27.6, 29.5), C.gold, 3.4, { glow: true }));
    push(this.dot(P.T, 5, C.gold, this.sm(t, 29.4, 30)));
    push(this.lab(P.T, 'T', C.titleGold, this.sm(t, 29.6, 30.2), { dx: 26, dy: -10, size: 34 }));
    push(this.lab(this.lp3(P.O, P.T, 0.5), '2', C.labelGold, this.sm(t, 28.4, 29.6), { dx: -22, size: 34, w: 600 }));
    push(this.tx(960, 886, 'Floor diagonal √2  +  rise √2  →  the sundial line', C.white,      this.fio(t, 30, 31, 38, 38.8), { size: 36, italic: true }));
    push(this.tx(960, 922, 'length = √((√2)² + (√2)²) = √4 = 2',                 C.labelGold, this.fio(t, 31, 32, 38, 38.8), { size: 32, italic: true }));

    // V. THE LOST TRIANGLE
    push(this.seg(P.O, P.U, this.sm(t, 38.6, 39.7), C.cyan, 3, { glow: true }));
    push(this.seg(P.U, P.T, this.sm(t, 40, 41.5),   C.magenta, 2.4, { dash: '7 7' }));
    {
      const o = this.sm(t, 41.5, 42.1);
      push(this.lab(this.lp3(P.O, P.U, 0.5),  '1',  C.labelCyan, o, { dy: 26, size: 28 }));
      push(this.lab(this.lp3(P.U, P.T, 0.55), '√3', C.labelMag,  o, { dx: 26, size: 30, italic: true }));
    }
    push(this.tx(960, 886, 'The Lost Triangle:  sides  1,  √3,  2',      C.titleGold, this.fio(t, 42.5, 43.5, 49, 49.8), { size: 40, italic: true }));
    push(this.tx(960, 922, 'a 30–60–90 right triangle, seen edge-on',    C.white,     this.fio(t, 43.5, 44.3, 49, 49.8), { size: 30, italic: true }));

    // VI. MIRROR SUNDIAL
    push(this.seg(P.O,   P.MDg, this.sm(t, 49.6, 50.8), C.cyan,    2.6, { glow: true }));
    push(this.seg(P.MDg, P.P2,  this.sm(t, 51,   52.4), C.magenta, 3,   { glow: true }));
    push(this.seg(P.O,   P.P2,  this.sm(t, 52.6, 54.2), C.magenta, 3.4, { glow: true }));
    push(this.dot(P.P2, 5, C.magenta, this.sm(t, 54, 54.6)));
    push(this.lab(P.P2, 'P₂', C.titleMag, this.sm(t, 54.2, 54.8), { dx: -14, dy: -22, size: 34, italic: true }));
    push(this.lab(this.lp3(P.O, P.P2, 0.5), '2', C.labelMag, this.sm(t, 52.8, 54), { dx: -22, size: 32, w: 600 }));

    // VII. 120° REVELATION
    {
      const Os = this.proj(P.O), Ts = this.proj(P.T), Ps = this.proj(P.P2);
      let aA = Math.atan2(Ts[1] - Os[1], Ts[0] - Os[0]);
      let aB = Math.atan2(Ps[1] - Os[1], Ps[0] - Os[0]);
      let d  = aB - aA;
      while (d >  Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      const prog = this.sm(t, 60, 61.8), aE = aA + d * prog;
      const vis  = this.fio(t, 60, 61.6, 86, 87.5), rW = 128, sweep = d > 0 ? 1 : 0;
      if (vis > 0) {
        const x0 = Os[0] + rW * Math.cos(aA), y0 = Os[1] + rW * Math.sin(aA);
        const x1 = Os[0] + rW * Math.cos(aE), y1 = Os[1] + rW * Math.sin(aE);
        push(<path key="wedge" d={`M${Os[0]} ${Os[1]} L${x0} ${y0} A${rW} ${rW} 0 0 ${sweep} ${x1} ${y1} Z`} fill="rgba(224,52,158,0.14)" stroke="none" opacity={vis} />);
        push(<path key="warc"  d={`M${x0} ${y0} A${rW} ${rW} 0 0 ${sweep} ${x1} ${y1}`} fill="none" stroke={C.red} strokeWidth={3.6} opacity={vis} filter="url(#g)" strokeLinecap="round" />);
      }
      const fr = this.sm(t, 61.5, 63.6);
      if (fr > 0 && fr < 1) {
        push(<circle key="flash" cx={Os[0]} cy={Os[1]} r={26 + fr * 250} fill="none" stroke={C.red} strokeWidth={4 * (1 - fr)} opacity={(1 - fr) * 0.85} filter="url(#g)" />);
      }
      const am = (aA + aE) / 2;
      const lp: XY = [Os[0] + (rW + 62) * Math.cos(am), Os[1] + (rW + 62) * Math.sin(am)];
      const appear = this.sm(t, 61.8, 62.7);
      const sc  = (0.55 + 0.45 * appear) * (1 + 0.05 * Math.sin(t * 3.2));
      const lop = this.fio(t, 61.8, 62.5, 86, 87.5);
      if (lop > 0) {
        push(<circle key="glow120" cx={lp[0]} cy={lp[1] - 18} r={70} fill={C.red} opacity={lop * 0.18} filter="url(#g)" />);
        push(
          <text key="t120" x={lp[0]} y={lp[1]}
            fill={C.titleRed} opacity={lop}
            fontSize={72} fontWeight={600}
            fontFamily="'Cormorant Garamond',serif"
            textAnchor="middle" filter="url(#g)"
            transform={`translate(${lp[0]} ${lp[1]}) scale(${sc}) translate(${-lp[0]} ${-lp[1]})`}>
            120°
          </text>
        );
      }
    }

    // right-angle marker at Dg
    {
      const rop = this.sm(t, 64, 65.4);
      if (rop > 0) {
        const D  = this.proj(P.Dg), Tp = this.proj(P.T), Up = this.proj(P.U);
        const v1: XY = [Tp[0] - D[0], Tp[1] - D[1]];
        const v2: XY = [Up[0] - D[0], Up[1] - D[1]];
        const n1 = Math.hypot(v1[0], v1[1]) || 1, n2 = Math.hypot(v2[0], v2[1]) || 1, sz = 15;
        const a: XY = [D[0] + v1[0] / n1 * sz, D[1] + v1[1] / n1 * sz];
        const b: XY = [D[0] + v2[0] / n2 * sz, D[1] + v2[1] / n2 * sz];
        const c: XY = [a[0] + v2[0] / n2 * sz, a[1] + v2[1] / n2 * sz];
        push(<path key="rang" d={`M ${a[0]} ${a[1]} L ${c[0]} ${c[1]} L ${b[0]} ${b[1]}`} fill="none" stroke="rgba(60,203,142,.65)" strokeWidth={2} opacity={rop} />);
      }
    }

    // math block (bottom-left)
    const mOp = this.fio(t, 63, 64.4, 71, 71.8), mx = 86;
    push(this.tx(mx, 742, 'OP₁ = (1, 1, √2),   |OP₁| = 2',                           C.white,     mOp, { size: 34, italic: true, anchor: 'start' }));
    push(this.tx(mx, 798, 'OP₂ = (−1, 1, √2),   |OP₂| = 2   (mirror)',               C.white,     mOp, { size: 34, italic: true, anchor: 'start' }));
    push(this.tx(mx, 854, 'cos θ = (−1 + 1 + 2) / 4 = 1/2   ⟹   θ = 60°',          C.white,     mOp, { size: 34, italic: true, anchor: 'start' }));
    push(this.tx(mx, 912, 'supplement:  180° − 60° = 120°   (hexagon corner)',        C.titleRed,  mOp, { size: 34, italic: true, anchor: 'start', w: 600 }));

    // beginner captions
    push(this.tx(960, 914, 'A flat floor of unit squares — each cell is 1 × 1',                       C.white, this.fio(t,  3.2,  4.2,  7.2,  7.9), { size: 34, italic: true }));
    push(this.tx(960, 914, "A unit square's diagonal is √2   (since 1² + 1² = 2)",                   C.white, this.fio(t, 15,   15.8, 17.3, 18),   { size: 34, italic: true }));
    push(this.tx(960, 914, 'Now rise straight up by √2 — the same length as the diagonal',            C.white, this.fio(t, 21.5, 22.3, 26.3, 27),   { size: 34, italic: true }));
    push(this.tx(960, 914, 'Mirror the sundial across the upright plane — a twin line, length 2',     C.white, this.fio(t, 55,   55.8, 58.4, 59),   { size: 34, italic: true }));

    // final statements
    push(this.tx(960, 882, "The Lost Triangle defines the Fleishman joint's 120° dihedral angle.", C.white,              this.sm(t, 75, 76.4), { size: 46, italic: true, glow: true }));
    push(this.tx(960, 922, 'gregg fleishman',                                                       'rgba(138,132,128,.85)', this.sm(t, 77, 78),   { size: 30, italic: true }));

    // chapter title (top-left)
    const chapters: [number, string, string][] = [
      [0,  'I. The Plane',           C.titleCyan],
      [8,  'II. The 45° Diagonal',   C.titleCyan],
      [18, 'III. The Rise',          C.titleRed ],
      [27, 'IV. The Sundial Line',   C.titleGold],
      [38, 'V. The Lost Triangle',   C.titleGold],
      [49, 'VI. The Mirror Sundial', C.titleCyan],
      [59, 'VII. The 120° Revelation', C.titleRed],
    ];
    let act = chapters[0];
    for (const c of chapters) { if (t >= c[0]) act = c; }
    push(this.tx(72, 158, act[1], act[2], this.sm(t, act[0], act[0] + 0.7), { size: 52, anchor: 'start', glow: true, w: 800, face: "'Syne',sans-serif", ls: -1 }));

    // transport bar values
    const mm = Math.floor(t / 60), ss = Math.floor(t % 60);
    const dm = Math.floor(this.END / 60), ds = Math.floor(this.END % 60);
    const playing = this.state.playing;
    const { showChapters } = this.state;

    const heroMode = this.props.heroMode;

    return (
      <div style={{ position: heroMode ? 'absolute' : 'fixed', inset: 0, background: '#0B0B0B', overflow: 'hidden' }}>
        <div
          ref={(el) => { this.stage = el; if (el) this.fit(); }}
          style={{ position: 'absolute', left: '50%', top: '50%', width: '1920px', height: '1080px', transform: 'translate(-50%,-50%)', transformOrigin: 'center center' }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 72% 64% at 50% 44%, #16140F 0%, #0E0E0D 54%, #0B0B0B 100%)' }} />
          <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{ position: 'absolute', inset: 0, display: 'block' }}>
            {k}
          </svg>

          {/* chapter jump panel — hidden in hero mode */}
          {!heroMode && (
            <>
              <button
                onClick={() => this.setState(s => ({ showChapters: !s.showChapters }))}
                style={{ position: 'absolute', top: 176, left: 72, padding: '5px 14px', background: 'rgba(18,18,18,.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(240,237,232,.08)', borderRadius: 20, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8480', cursor: 'pointer', fontFamily: "'Space Grotesk',sans-serif" }}
              >{showChapters ? 'Chapters ▴' : 'Chapters ▾'}</button>
              {showChapters && (
                <div style={{ position: 'absolute', top: 210, left: 72, width: 280, background: 'rgba(13,13,13,.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(240,237,232,.08)', borderRadius: 12, padding: '10px 0', overflow: 'hidden' }}>
                  {chapters.map(([startTime, title, color], idx) => {
                    const nextStart = idx + 1 < chapters.length ? chapters[idx + 1][0] : Infinity;
                    const isActive = t >= startTime && t < nextStart;
                    return (
                      <ChapterRow
                        key={startTime}
                        startTime={startTime}
                        title={title}
                        color={color}
                        isActive={isActive}
                        onClick={() => this.setState({ t: startTime, playing: true, showChapters: false })}
                      />
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* transport bar — hidden in hero mode */}
          {!heroMode && (
            <div style={{ position: 'absolute', left: '50%', bottom: '34px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '18px', padding: '11px 20px', borderRadius: '14px', background: 'rgba(18,18,18,.66)', backdropFilter: 'blur(10px)', border: '1px solid rgba(240,237,232,.07)', boxShadow: '0 8px 30px rgba(0,0,0,.5)', fontFamily: "'Space Grotesk',sans-serif" }}>
              <button
                onClick={() => { if (this.state.t >= this.END) this.setState({ t: 0, playing: true }); else this.setState(s => ({ playing: !s.playing })); }}
                style={{ width: 40, height: 40, border: 'none', borderRadius: 10, background: 'rgba(200,169,110,.16)', color: '#F0EDE8', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >{playing ? '❚❚' : '►'}</button>
              <button
                onClick={() => this.setState({ t: 0, playing: true })}
                style={{ width: 36, height: 36, border: 'none', borderRadius: 10, background: 'rgba(240,237,232,.06)', color: '#8A8480', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >↻</button>
              <span style={{ fontSize: 12, color: '#8A8480', fontVariantNumeric: 'tabular-nums', minWidth: 40, textAlign: 'right', letterSpacing: '0.04em' }}>
                {mm}:{String(ss).padStart(2, '0')}
              </span>
              <input
                className="lt-scrub"
                type="range" min={0} max={1000}
                value={Math.round((t / this.END) * 1000)}
                onChange={(e) => {
                  const v = (parseFloat(e.target.value) / 1000) * this.END;
                  this.setState({ t: v, playing: false });
                  localStorage.setItem('lt_t', v.toFixed(2));
                }}
                style={{ width: 360 }}
              />
              <span style={{ fontSize: 12, color: '#8A8480', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}>
                {dm}:{String(ds).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 10, color: '#4A4643', letterSpacing: '0.08em', textTransform: 'uppercase', marginLeft: 8 }}>Space · ← →</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

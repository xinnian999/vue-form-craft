function getAllLetter(): string[] {
  const letterStr =
    'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z'
  return letterStr.split(',')
}

function randomNum(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

function randomColor(min: number, max: number): string {
  const r = randomNum(min, max)
  const g = randomNum(min, max)
  const b = randomNum(min, max)
  return `rgb(${r},${g},${b})`
}

interface GVerifyOptions {
  element: HTMLElement | null
  canvasId: string
  width: string
  height: string
  type: string
  code: string
  numArr: string[]
  letterArr: string[]
}

export default class GVerify {
  version: string = '1.0.0'
  options: GVerifyOptions

  constructor(element: HTMLElement | null, options?: Partial<GVerifyOptions>) {
    this.options = {
      element: null,
      canvasId: 'verifyCanvas',
      width: '100',
      height: '30',
      type: 'blend',
      code: '',
      numArr: '0,1,2,3,4,5,6,7,8,9'.split(','),
      letterArr: getAllLetter(),
      ...options
    }

    if (element) {
      this.options.element = element

      this._init()
      this.refresh()
    }
  }

  _init = () => {
    const con = this.options.element
    if (!con) return

    const canvas = document.createElement('canvas')
    this.options.width = con.offsetWidth > 0 ? con.offsetWidth.toString() : '100'
    this.options.height = con.offsetHeight > 0 ? con.offsetHeight.toString() : '30'
    canvas.id = this.options.canvasId
    canvas.width = parseInt(this.options.width)
    canvas.height = parseInt(this.options.height)
    canvas.style.cursor = 'pointer'
    canvas.innerHTML = '您的浏览器版本不支持canvas'
    con.appendChild(canvas)
    canvas.onclick = () => {
      this.refresh()
    }
  }

  refresh = () => {
    this.options.code = ''
    const canvas = document.getElementById(this.options.canvasId) as HTMLCanvasElement
    if (!canvas || !canvas.getContext) {
      return
    }

    const ctx = canvas.getContext('2d')!
    ctx.textBaseline = 'middle'
    ctx.fillStyle = randomColor(180, 240)
    ctx.fillRect(0, 0, parseInt(this.options.width), parseInt(this.options.height))

    let txtArr: string[]
    if (this.options.type === 'blend') {
      txtArr = [...this.options.numArr, ...this.options.letterArr]
    } else if (this.options.type === 'number') {
      txtArr = this.options.numArr
    } else {
      txtArr = this.options.letterArr
    }

    for (let i = 1; i <= 4; i++) {
      const txt = txtArr[randomNum(0, txtArr.length)]
      this.options.code += txt
      ctx.font = `${randomNum(parseInt(this.options.height) / 2, parseInt(this.options.height))}px SimHei`
      ctx.fillStyle = randomColor(50, 160)
      ctx.shadowOffsetX = randomNum(-3, 3)
      ctx.shadowOffsetY = randomNum(-3, 3)
      ctx.shadowBlur = randomNum(-3, 3)
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)'
      const x = (parseInt(this.options.width) / 5) * i
      const y = parseInt(this.options.height) / 2
      const deg = randomNum(-30, 30)
      ctx.translate(x, y)
      ctx.rotate((deg * Math.PI) / 180)
      ctx.fillText(txt, 0, 0)
      ctx.rotate((-deg * Math.PI) / 180)
      ctx.translate(-x, -y)
    }

    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(40, 180)
      ctx.beginPath()
      ctx.moveTo(
        randomNum(0, parseInt(this.options.width)),
        randomNum(0, parseInt(this.options.height))
      )
      ctx.lineTo(
        randomNum(0, parseInt(this.options.width)),
        randomNum(0, parseInt(this.options.height))
      )
      ctx.stroke()
    }

    for (let i = 0; i < parseInt(this.options.width) / 4; i++) {
      ctx.fillStyle = randomColor(0, 255)
      ctx.beginPath()
      ctx.arc(
        randomNum(0, parseInt(this.options.width)),
        randomNum(0, parseInt(this.options.height)),
        1,
        0,
        2 * Math.PI
      )
      ctx.fill()
    }
  }

  validate = (code: string): boolean => {
    const lowerCaseCode = code.toLowerCase()
    const lowerCaseVCode = this.options.code.toLowerCase()
    console.log(lowerCaseVCode)
    if (lowerCaseCode === lowerCaseVCode) {
      return true
    } else {
      this.refresh()
      return false
    }
  }
}

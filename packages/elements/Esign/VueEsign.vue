<template>
  <canvas ref="canvas" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp"
  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  props: {
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 300
    },
    lineWidth: {
      type: Number,
      default: 4
    },
    lineColor: {
      type: String,
      default: '#000000'
    },
    bgColor: {
      type: String,
      default: ''
    },
    isCrop: {
      type: Boolean,
      default: false
    },
    isClearBgColor: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'image/png'
    },
    quality: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const hasDrew = ref(false);
    const resultImg = ref('');
    const points = ref<{ x: number; y: number }[]>([]);
    const canvasTxt = ref<CanvasRenderingContext2D | null>(null);
    const startX = ref(0);
    const startY = ref(0);
    const isDrawing = ref(false);
    const sratio = ref(1);
    const canvas = ref<HTMLCanvasElement | null>(null);

    const ratio = computed(() => props.height / props.width);
    const myBg = computed(() => props.bgColor ? props.bgColor : 'rgba(255, 255, 255, 0)');

    watch(myBg, (newVal) => {
      if (canvas.value) {
        canvas.value.style.background = newVal;
      }
    });

    const resizeHandler = () => {
      if (canvas.value) {
        canvas.value.style.width = `${props.width}px`;
        const realw = parseFloat(window.getComputedStyle(canvas.value).width);
        canvas.value.style.height = `${ratio.value * realw}px`;
        canvasTxt.value = canvas.value.getContext('2d');
        if (canvasTxt.value) {
          canvasTxt.value.scale(1 * sratio.value, 1 * sratio.value);
          sratio.value = realw / props.width;
          canvasTxt.value.scale(1 / sratio.value, 1 / sratio.value);
        }
      }
    };

    onMounted(() => {
      if (canvas.value) {
        canvas.value.height = props.height;
        canvas.value.width = props.width;
        canvas.value.style.background = myBg.value;
        resizeHandler();
        document.onmouseup = () => {
          isDrawing.value = false;
        };
      }
      window.addEventListener('resize', resizeHandler);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', resizeHandler);
    });

    const drawStart = (obj: { x: number; y: number }) => {
      startX.value = obj.x;
      startY.value = obj.y;
      if (canvasTxt.value) {
        canvasTxt.value.beginPath();
        canvasTxt.value.moveTo(startX.value, startY.value);
        canvasTxt.value.lineTo(obj.x, obj.y);
        canvasTxt.value.lineCap = 'round';
        canvasTxt.value.lineJoin = 'round';
        canvasTxt.value.lineWidth = props.lineWidth * sratio.value;
        canvasTxt.value.stroke();
        canvasTxt.value.closePath();
        points.value.push(obj);
      }
    };

    const drawMove = (obj: { x: number; y: number }) => {
      if (canvasTxt.value) {
        canvasTxt.value.beginPath();
        canvasTxt.value.moveTo(startX.value, startY.value);
        canvasTxt.value.lineTo(obj.x, obj.y);
        canvasTxt.value.strokeStyle = props.lineColor;
        canvasTxt.value.lineWidth = props.lineWidth * sratio.value;
        canvasTxt.value.lineCap = 'round';
        canvasTxt.value.lineJoin = 'round';
        canvasTxt.value.stroke();
        canvasTxt.value.closePath();
        startY.value = obj.y;
        startX.value = obj.x;
        points.value.push(obj);
      }
    };

    const drawEnd = (obj: { x: number; y: number }) => {
      if (canvasTxt.value) {
        canvasTxt.value.beginPath();
        canvasTxt.value.moveTo(startX.value, startY.value);
        canvasTxt.value.lineTo(obj.x, obj.y);
        canvasTxt.value.lineCap = 'round';
        canvasTxt.value.lineJoin = 'round';
        canvasTxt.value.stroke();
        canvasTxt.value.closePath();
        points.value.push(obj);
        points.value.push({ x: -1, y: -1 });
      }
    };

    const generate = (options?: { format?: string; quality?: number }) => {
      const imgFormat = options?.format || props.format;
      const imgQuality = options?.quality || props.quality;
      return new Promise<string>((resolve, reject) => {
        if (!hasDrew.value) {
          reject(`Warning: Not Signed!`);
          return;
        }
        if (canvasTxt.value) {
          const resImgData = canvasTxt.value.getImageData(0, 0, canvas.value!.width, canvas.value!.height);
          canvasTxt.value.globalCompositeOperation = "destination-over";
          canvasTxt.value.fillStyle = myBg.value;
          canvasTxt.value.fillRect(0, 0, canvas.value!.width, canvas.value!.height);
          resultImg.value = canvas.value!.toDataURL(imgFormat, imgQuality);
          let generatedImg = resultImg.value;
          canvasTxt.value.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
          canvasTxt.value.putImageData(resImgData, 0, 0);
          canvasTxt.value.globalCompositeOperation = "source-over";
          if (props.isCrop) {
            const crop_area = getCropArea(resImgData.data);
            const crop_canvas = document.createElement('canvas');
            const crop_ctx = crop_canvas.getContext('2d');
            if (crop_ctx) {
              crop_canvas.width = crop_area[2] - crop_area[0];
              crop_canvas.height = crop_area[3] - crop_area[1];
              const crop_imgData = canvasTxt.value.getImageData(crop_area[0], crop_area[1], crop_area[2], crop_area[3]);
              crop_ctx.globalCompositeOperation = "destination-over";
              crop_ctx.putImageData(crop_imgData, 0, 0);
              crop_ctx.fillStyle = myBg.value;
              crop_ctx.fillRect(0, 0, crop_canvas.width, crop_canvas.height);
              generatedImg = crop_canvas.toDataURL(imgFormat, imgQuality);
            }
          }
          resolve(generatedImg);
        }
      });
    };

    const reset = () => {
      if (canvasTxt.value) {
        canvasTxt.value.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
      }
      if (props.isClearBgColor) {
        points.value = [];
        hasDrew.value = false;
        resultImg.value = '';
      }
    };

    const getCropArea = (imgData: Uint8ClampedArray) => {
      let topX = canvas.value!.width; 
      let btmX = 0; 
      let topY = canvas.value!.height; 
      let btnY = 0;
      for (let i = 0; i < canvas.value!.width; i++) {
        for (let j = 0; j < canvas.value!.height; j++) {
          const pos = (i + canvas.value!.width * j) * 4;
          if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] > 0 || imgData[pos + 3] > 0) {
            btnY = Math.max(j, btnY);
            btmX = Math.max(i, btmX);
            topY = Math.min(j, topY);
            topX = Math.min(i, topX);
          }
        }
      }
      return [topX + 1, topY + 1, btmX + 1, btnY + 1];
    };

    return {
      canvas,
      myBg,
      drawStart,
      drawMove,
      drawEnd,
      generate,
      reset,
      touchStart: (e: TouchEvent) => {
        e.preventDefault();
        hasDrew.value = true;
        if (e.touches.length === 1 && canvas.value) {
          const obj = {
            x: e.targetTouches[0].clientX - canvas.value.getBoundingClientRect().left,
            y: e.targetTouches[0].clientY - canvas.value.getBoundingClientRect().top
          };
          drawStart(obj);
        }
      },
      touchMove: (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches.length === 1) {
          const obj = {
            x: e.targetTouches[0].clientX - canvas.value!.getBoundingClientRect().left,
            y: e.targetTouches[0].clientY - canvas.value!.getBoundingClientRect().top
          };
          drawMove(obj);
        }
      },
      touchEnd: (e: TouchEvent) => {
        e.preventDefault();
        if (e.touches.length === 1) {
          const obj = {
            x: e.targetTouches[0].clientX - canvas.value!.getBoundingClientRect().left,
            y: e.targetTouches[0].clientY - canvas.value!.getBoundingClientRect().top
          };
          drawEnd(obj);
        }
      },
      mouseDown: (e: MouseEvent) => {
        e.preventDefault();
        isDrawing.value = true;
        hasDrew.value = true;
        const obj = {
          x: e.offsetX,
          y: e.offsetY
        };
        drawStart(obj);
      },
      mouseMove: (e: MouseEvent) => {
        e.preventDefault();
        if (isDrawing.value) {
          const obj = {
            x: e.offsetX,
            y: e.offsetY
          };
          drawMove(obj);
        }
      },
      mouseUp: (e: MouseEvent) => {
        e.preventDefault();
        const obj = {
          x: e.offsetX,
          y: e.offsetY
        };
        drawEnd(obj);
        isDrawing.value = false;
      }
    };
  }
});
</script>

<style scoped>
canvas {
  max-width: 100%;
  display: block;
}
</style>

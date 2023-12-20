export default {
  items: [
    {
      label: "label宽度",
      component: "inputNumber",
      name: "labelWidth",
      props: {
        min: 60,
        unit: "px",
        step: 10,
      },
      initialValue: 150,
    },
    {
      label: "label对齐方式",
      component: "radio",
      name: "labelAlign",
      props: {
        mode: "static",
        options: [
          { label: "左对齐", value: "left" },
          { label: "居上", value: "top" },
          { label: "右对齐", value: "right" },
        ],
      },
      initialValue: "right",
    },
    {
      label: "表单组件尺寸",
      component: "radio",
      name: "size",
      props: {
        mode: "static",
        options: [
          { label: "默认", value: "default" },
          { label: "较小", value: "small" },
          { label: "较大", value: "large" },
        ],
      },
      initialValue: "default",
    },
  ],
};

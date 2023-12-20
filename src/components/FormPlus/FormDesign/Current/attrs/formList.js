export default {
  items: [
    { label: "字段label", component: "input", name: "label" },
    { label: "字段name", component: "input", name: "name" },
    { label: "是否必填", component: "switch", name: "required" },
    {
      label: "props",
      component: "itemGroup",
      name: "props",
      children: [
        {
          label: "显示模式",
          component: "radio",
          name: "mode",
          props: {
            mode: "static",
            options: [
              { label: "表格", value: "table" },
              { label: "卡片", value: "card" },
              { label: "行内", value: "inline" },
            ],
          },
          initialValue: "table",
        },
      ],
    },
  ],
};

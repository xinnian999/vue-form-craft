export default {
  items: [
    { label: "字段label", component: "input", name: "label" },
    { label: "字段name", component: "input", name: "name" },
    { label: "默认值", component: "input", name: "initialValue" },
    { label: "是否必填", component: "switch", name: "required" },
    {
      label: "props",
      component: "itemGroup",
      name: "props",
      children: [
        { label: "是否禁用", component: "switch", name: "disabled" },
        {
          label: "占位提示",
          component: "input",
          name: "placeholder",
          initialValue: "请输入...",
        },
      ],
    },

    { label: "隐藏条件", component: "input", name: "hidden" },
    {
      label: "联动值",
      name: "linkage",
      component: "formList",
      children: [
        {
          label: "联动字段",
          name: "target",
          component: "input",
          props: {},
        },
        {
          label: "值",
          name: "value",
          component: "input",
          props: {},
        },
      ],
      props: {
        mode: "card",
      },
    },
  ],
};

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
          label: "自动选中第一项",
          component: "switch",
          name: "autoSelectedFirst",
        },
        {
          label: "选项样式类型",
          component: "radio",
          name: "optionType",
          props: {
            mode: "static",
            options: [
              { label: "无边框", value: "circle" },
              { label: "边框", value: "border" },
              { label: "按钮", value: "button" },
            ],
          },
          initialValue: "circle",
        },
        {
          label: "选项间距",
          component: "inputNumber",
          name: "space",
          props: {
            min: 0,
          },
          initialValue: 0,
        },
        {
          label: "labelKey",
          component: "input",
          name: "labelKey",
          initialValue: "label",
        },
        {
          label: "valueKey",
          component: "input",
          name: "valueKey",
          initialValue: "value",
        },
        {
          label: "数据模式",
          component: "radio",
          name: "mode",
          props: {
            mode: "static",
            options: [
              { label: "静态", value: "static" },
              { label: "远程", value: "remote" },
            ],
          },
        },
        {
          label: " ",
          name: "options",
          component: "formList",
          hidden: '{{$form.props.mode!=="static"}}',
          children: [
            {
              label: "label",
              name: "label",
              component: "input",
              props: {},
            },
            {
              label: "value",
              name: "value",
              component: "input",
              props: {},
            },
          ],
        },
        {
          label: "",
          component: "itemGroup",
          name: "api",
          hidden: '{{$form.props.mode==="static"}}',
          props: {
            items: [
              {
                label: "url",
                component: "input",
                name: "url",
                initialValue: "/iac/api/",
              },
              {
                label: "请求方式",
                component: "radio",
                name: "method",
                props: {
                  mode: "static",
                  autoSelectedFirst: true,
                  options: [
                    { label: "GET", value: "GET" },
                    { label: "POST", value: "POST" },
                    { label: "PUT", value: "PUT" },
                    { label: "DELETE", value: "DELETE" },
                  ],
                  optionType: "button",
                },
              },
            ],
          },
        },
      ],
    },
  ],
};

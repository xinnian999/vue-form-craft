import type { FormSchema } from "@vue-form-craft/types";

export default {
  "labelWidth": 150,
  "labelAlign": "right",
  "size": "default",
  "scrollToError": true,
  "items": [
    {
      "label": "商品选择",
      "name": "product",
      "component": "Radio",
      "props": {
        "placeholder": "请选择商品",
        "options": [
          {
            "label": "商品A",
            "value": "productA",
            "price": 25
          },
          {
            "label": "商品B",
            "value": "productB",
            "price": 15
          },
          {
            "label": "商品C",
            "value": "productC",
            "price": 100
          }
        ]
      },
      "required": true,
      "designKey": "design-uMUF"
    },
    {
      "label": "购买数量",
      "name": "quantity",
      "component": "InputNumber",
      "props": {
        "min": 1,
        "placeholder": "",
        "controlsPosition": "right"
      },
      "required": true,
      "designKey": "design-vJQN",
      "initialValue": 1
    },
    {
      "label": "收货地址",
      "name": "address",
      "component": "Input",
      "props": {
        "placeholder": "请输入收货地址"
      },
      "required": true,
      "designKey": "design-dzhz"
    },
    {
      "label": "付款方式",
      "name": "paymentMethod",
      "component": "Radio",
      "props": {
        "options": [
          {
            "label": "支付宝",
            "value": "alipay"
          },
          {
            "label": "微信支付",
            "value": "wechat"
          },
          {
            "label": "信用卡",
            "value": "creditCard"
          }
        ],
        "api": {
          "url": "https://apifoxmock.com/m1/5213940-4880280-default/options/test",
          "method": "GET",
          "params": {},
          "dataPath": "data"
        },
        "labelKey": "label",
        "valueKey": "value",
        "disabledKey": "disabled",
        "mode": "static"
      },
      "required": true,
      "designKey": "design-vXx2",
      "initialValue": "alipay"
    },
    {
      "label": "商品单价",
      "name": "price",
      "component": "Text",
      "props": {
        "text": "{{ $selectData.product ? $selectData.product?.price + '元' : '请选择商品' }}"
      },
      "designKey": "design-0oHv"
    }
  ]
} satisfies FormSchema
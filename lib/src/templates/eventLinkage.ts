import type { FormSchema } from '@/types'

export default {
  labelWidth: 150,
  labelAlign: 'right',
  size: 'default',
  submitBtn: true,
  initialValues: {},
  items: [
    {
      label: '用户名',
      name: 'username',
      component: 'Input',
      props: {
        placeholder: '请输入用户名',
        maxlength: 20,
        onBlur: `{{ () => {
  const username = $values.username
  if (username && username.length < 3) {
    $instance.setFieldValue('usernameValid', false)
    $instance.setFieldValue('tip', '用户名至少3个字符')
  } else if (username) {
    $instance.setFieldValue('usernameValid', true)
    $instance.setFieldValue('tip', '用户名可用')
  }
} }}`
      },
      required: true
      },
    {
      label: '验证状态',
      name: 'usernameValid',
      component: 'Switch',
      props: {
        disabled: true,
        activeText: '可用',
        inactiveText: '不可用'
      }
      },
    {
      label: '提示信息',
      name: 'tip',
      component: 'Input',
      props: {
        disabled: true,
        placeholder: '这里会显示验证提示'
      }
      },
    {
      label: '省份',
      name: 'province',
      component: 'Select',
      props: {
        placeholder: '请选择省份',
        mode: 'static',
        options: [
          { label: '广东省', value: 'guangdong' },
          { label: '北京市', value: 'beijing' },
          { label: '上海市', value: 'shanghai' }
        ],
        onChange: `{{ (province) => {
  // 根据省份动态设置城市选项
  let cityOptions = []
  if (province === 'guangdong') {
    cityOptions = [
      { label: '广州市', value: 'guangzhou' },
      { label: '深圳市', value: 'shenzhen' },
      { label: '珠海市', value: 'zhuhai' }
    ]
  } else if (province === 'beijing') {
    cityOptions = [
      { label: '东城区', value: 'dongcheng' },
      { label: '西城区', value: 'xicheng' },
      { label: '朝阳区', value: 'chaoyang' }
    ]
  } else if (province === 'shanghai') {
    cityOptions = [
      { label: '黄浦区', value: 'huangpu' },
      { label: '徐汇区', value: 'xuhui' },
      { label: '长宁区', value: 'changning' }
    ]
  }
  
  // 更新城市选项
  $instance.setFieldAttr('city', 'props.options', cityOptions)
  
  // 清空城市选择
  $instance.setFieldValue('city', '')
  
  // 清空区县选择
  $instance.setFieldValue('district', '')
} }}`
      },
      required: true
      },
    {
      label: '城市',
      name: 'city',
      component: 'Select',
      props: {
        placeholder: '请先选择省份',
        mode: 'static',
        options: [],
        onChange: `{{ (city) => {
  // 根据城市动态设置区县选项
  let districtOptions = []
  if (city === 'guangzhou') {
    districtOptions = [
      { label: '天河区', value: 'tianhe' },
      { label: '越秀区', value: 'yuexiu' }
    ]
  } else if (city === 'shenzhen') {
    districtOptions = [
      { label: '南山区', value: 'nanshan' },
      { label: '福田区', value: 'futian' }
    ]
  } else if (city === 'dongcheng' || city === 'xicheng') {
    districtOptions = [
      { label: '街道1', value: 'street1' },
      { label: '街道2', value: 'street2' }
    ]
  }
  
  // 更新区县选项
  $instance.setFieldAttr('district', 'props.options', districtOptions)
  
  // 清空区县选择
  $instance.setFieldValue('district', '')
} }}`
      }
      },
    {
      label: '区县',
      name: 'district',
      component: 'Select',
      props: {
        placeholder: '请先选择城市',
        mode: 'static',
        options: []
      }
      },
    {
      label: '单价',
      name: 'price',
      component: 'InputNumber',
      props: {
        min: 0,
        precision: 2,
        placeholder: '请输入单价',
        onChange: `{{ () => {
  const price = $values.price || 0
  const quantity = $values.quantity || 0
  const total = (price * quantity).toFixed(2)
  $instance.setFieldValue('total', total)
} }}`
      }
      },
    {
      label: '数量',
      name: 'quantity',
      component: 'InputNumber',
      props: {
        min: 1,
        placeholder: '请输入数量',
        onChange: `{{ () => {
  const price = $values.price || 0
  const quantity = $values.quantity || 0
  const total = (price * quantity).toFixed(2)
  $instance.setFieldValue('total', total)
} }}`
      }
      },
    {
      label: '总价',
      name: 'total',
      component: 'InputNumber',
      props: {
        disabled: true,
        precision: 2,
        placeholder: '自动计算'
      }
      },
    {
      label: '备注',
      name: 'remark',
      component: 'TextArea',
      props: {
        placeholder: '请输入备注',
        maxlength: 200,
        showWordLimit: true,
        onInput: `{{ () => {
  const remark = $values.remark || ''
  const length = remark.length
  
  if (length > 150) {
    $instance.setFieldValue('remarkTip', '备注内容较长，请精简')
  } else if (length > 100) {
    $instance.setFieldValue('remarkTip', '备注内容适中')
  } else if (length > 0) {
    $instance.setFieldValue('remarkTip', '备注内容较短')
  } else {
    $instance.setFieldValue('remarkTip', '')
  }
} }}`
      }
      },
    {
      label: '备注提示',
      name: 'remarkTip',
      component: 'Input',
      props: {
        disabled: true,
        placeholder: '根据备注长度自动提示'
      }
      }
  ]
} satisfies FormSchema

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FormRender: (typeof import('formora'))['FormRender']
    FormDesign: (typeof import('formora'))['FormDesign']
  }
}

export { }

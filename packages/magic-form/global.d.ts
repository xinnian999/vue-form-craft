declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    FormRender: (typeof import('magic-form'))['FormRender']
    FormDesign: (typeof import('magic-form'))['FormDesign']
  }
}

export {}

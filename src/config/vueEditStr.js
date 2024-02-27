export default (schema) => `<template>
    <schema-form :schema="schema" footer  @onFinish="onFinish" />
</template>

<script setup>

const onFinish = (values) => {
  alert(JSON.stringify(values))
}

const schema = ${schema}

</script>

`

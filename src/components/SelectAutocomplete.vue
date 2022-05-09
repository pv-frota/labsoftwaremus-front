<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-select outlined dense stack-label
        v-model="value"
        v-bind="$attrs"
        map-options emit-value
        :label="label"
        :options="values"
        :option-label="attribute"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              Sem resultados
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectAutocomplete',
  props: {  
    values: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    attribute: {
      type: String,
      required: true
    }
  },
  computed: {
    value: {
      get () { return this.$attrs.value },
      set (val) { this.$emit('input', val) }
    }
  }
}
</script>
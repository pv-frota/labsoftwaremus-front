<template>
  <q-select outlined dense stack-label behavior="menu"
    v-model="value"
    v-bind="$attrs"
    use-input
    input-debounce="0"
    @filter="filterFn"
    :label="label"
    :options="filtered"
    :option-label="attribute"
    :disable="disable"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Sem resultados
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
export default {
  name: 'SelectAutocompleteAsync',
  props: {  
    promise: {
      type: Promise,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    attribute: {
      type: String,
      required: true
    },
    disable: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  data () {
    return {
      unfiltered: [],
      filtered: []
    }
  },
  mounted () {
    this.promise.then((v) => {
      this.unfiltered = v
      this.filtered = this.unfiltered
    })  
  },
  computed: {
    value: {
      get () { return this.$attrs.value },
      set (val) { this.$emit('select', val) }
    }
  },
  methods: {
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.filtered = this.unfiltered
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filtered = this.unfiltered.filter(v => v[this.attribute].toLowerCase().startsWith(needle))
      })
    }
  }
}
</script>
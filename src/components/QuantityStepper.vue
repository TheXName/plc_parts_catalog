<template>
  <div class="d-flex align-center ga-1">
    <v-btn size="small" variant="tonal" icon="mdi-minus" @click="stepDown" :disabled="atMin" />

    <v-text-field
      type="number"
      inputmode="numeric"
      variant="outlined"
      density="comfortable"
      hide-details
      style="width: 92px"
      :step="step"
      :min="min"
      :max="max > 0 ? max : undefined"
      :model-value="internal"
      @update:model-value="onManual"
      @blur="normalize"
      @wheel.prevent
    />

    <v-btn size="small" variant="tonal" icon="mdi-plus" @click="stepUp" :disabled="atMax" />
  </div>
</template>

<script>
export default {
  name: 'QuantityStepper',
  props: {
    modelValue: { type: Number, required: true },
    min: { type: Number, default: 1 },
    max: { type: Number, default: 0 }, // 0 = нет верхнего лимита
    step: { type: Number, default: 1 },
  },
  emits: ['update:modelValue'],
  data() {
    return { internal: this.modelValue }
  },
  watch: {
    modelValue(v) {
      this.internal = v
    },
  },
  computed: {
    atMin() {
      return this.maxClamp(this.modelValue) <= this.minClamp(this.min)
    },
    atMax() {
      const m = this.maxClamp(this.max)
      return m > 0 && this.modelValue >= m
    },
  },
  methods: {
    minClamp(v) {
      return Math.floor(Number.isFinite(v) ? v : 1)
    },
    maxClamp(v) {
      return Math.floor(Number.isFinite(v) ? v : 0)
    },
    clamp(v) {
      const min = this.minClamp(this.min)
      const max = this.maxClamp(this.max)
      let nv = Math.floor(Number(v))
      if (!Number.isFinite(nv)) nv = min
      if (nv < min) nv = min
      if (max > 0 && nv > max) nv = max
      return nv
    },
    emit(nv) {
      this.internal = nv
      this.$emit('update:modelValue', nv)
    },
    onManual(v) {
      this.emit(this.clamp(v))
    },
    normalize() {
      this.emit(this.clamp(this.internal))
    },
    stepDown() {
      this.emit(this.clamp(this.modelValue - this.step))
    },
    stepUp() {
      this.emit(this.clamp(this.modelValue + this.step))
    },
  },
}
</script>

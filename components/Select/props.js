export default {
  searchable: Boolean,
  modelValue: {
    type: [String, Number],
    default: undefined,
  },
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: undefined,
  },
  listClass: {
    type: Array,
    required: true,
  },
}

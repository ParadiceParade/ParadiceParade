<script>
import { mapState } from 'vuex'

export default {
  name: 'Img',

  computed: {
    ...mapState(['appMounted'])
  },

  render(h) {
    const attrs = this.$attrs

    const nativeImg = !!attrs.src

    const href = `${
      attrs.src || attrs.publicId || attrs['public-id'] || attrs.href
    }`

    if (!this.appMounted) {
      return h(nativeImg ? 'img' : 'a', {
        attrs: {
          href: nativeImg ? undefined : href,
          src: nativeImg ? href : undefined,
          rel: 'noopener noreferrer',
          title: 'image loading'
        },
        style: {
          height: attrs.height,
          width: attrs.width
        }
      })
    }

    const image = (d, c) => h(nativeImg ? 'img' : 'cld-image', d, c)

    return image({
      props: !nativeImg
        ? {
            publicId: href,
            // loading: 'lazy',
            ...attrs
          }
        : undefined,

      attrs: {
        height: attrs.height,
        width: attrs.width,
        loading: 'lazy',
        ...(nativeImg ? attrs : {})
      },

      style: {
        height: attrs.height,
        width: attrs.width
      }
    })
  }
}
</script>

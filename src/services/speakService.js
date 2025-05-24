let audioSource
export default {
    speak: async (word) => {
        audioSource('http://api.voicerss.org/?key=95d0c5a6736d4f87bc122ba9033f31ab&hl=en-us&src=' + word)
    },
    initSource: (cb) => {
        audioSource = cb
    }
}
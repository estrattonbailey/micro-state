function create (initialState) {
  const cache = new Map()

  return {
    getState () {
      return initialState
    },
    connect (map) {
      let state = map(initialState)

      cache.set(map, {
        update (updateState) {
          if (!updateState || typeof updateState !== 'function') return

          const updatedState = updateState(state)
          const newState = map(Object.assign(initialState, updatedState))

          for (key in newState) {
            if (state[key] !== newState[key]) {
              state = newState
              this.onUpdate && this.onUpdate(state)
              cache.forEach(function updateCallback (instance, key) {
                if (map !== key) {
                  instance.update(updateState)
                }
              })
              return
            }
          }
        },
        initialState: state
      })

      return cache.get(map)
    }
  }
}

module.exports = create

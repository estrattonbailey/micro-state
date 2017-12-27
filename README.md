# micro-state
Tiny functional state management for vanilla js applications.

## Usage
```javascript
const createStore = require('micro-state')

/**
 * root store
 */
const { connect, getState } = createStore({
  foo: false,
  bar: false,
  baz: false
})

console.log('initialstate', getState())

/** fooComponent */
const fooComponent = connect(state => ({
  foo: state.foo
}))
fooComponent.onUpdate = state => console.log('foo updated', state)

/** barComponent */
const barComponent = connect(state => ({
  bar: state.bar
}))
barComponent.onUpdate = state => console.log('bar updated', state)

/** bazComponent */
const bazComponent = connect(state => ({
  baz: state.baz
}))
bazComponent.onUpdate = state => console.log('baz updated', state)

/**
 * globalComponent
 */
const globalComponent = connect(state => ({
  foo: state.foo,
  bar: state.bar,
  baz: state.baz
}))

globalComponent.update(state => ({
  foo: true,
  bar: true,
  baz: false
}))

// outputs:
//
//    initialState { foo: false, bar: false, baz: false }
//    foo updated { foo: true }
//    bar updated { bar: true }
```

MIT

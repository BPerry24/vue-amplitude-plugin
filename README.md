# Vue-Amplitude Plugin
### A Vue.js plugin created to easily utilize Amplitude Javascript SDK

## Installation

## Using the Plugin
```
Vue.use(VueAmplitude, {
  apiKey,
  userId
});
```
apiKey
: **Required** provided by Amplitude on a per project basis
userId
: **Optional** used to define custom user identifier

```
Vue.prototype.$logEvent('YOUR_EVENT', {
  // OPTIONAL EVENT PROPERTIES
});
```

## Testing

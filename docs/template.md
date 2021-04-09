## HTML
```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="keywords" content="your keywords">
		<meta name="description" content="your description">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>your title</title>
		<link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
	</head>
	<body>
	</body>
</html>

```
## CSS
## JavaScript
## ES6
## Vue
#### 自定义指令
```
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  }
})
```
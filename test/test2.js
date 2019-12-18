var str = '<p class="odd" id="odd">123</p>'
var pattern = /<\/?[a-zA-Z]+(\s+[a-zA-Z]+=".*")*>/g
console.log(str.match(pattern))
var str = '<p class="odd" id="odd">123</p>'
var pattern = /<[^>]+>/g
console.log(str.match(pattern))
var str = '<input type="text" value=">" name="username" />'
var pattern = /<(?:[^"'>]|"[^"]*"|'[^']*')*>/g
console.log(str.match(pattern))
var str = '<input type="text" value=">" name="username" />test</input>'
var pattern = /<(?:[^"'>]|(["'])[^"']*\1)*>/g
console.log(str.replace(pattern,''))

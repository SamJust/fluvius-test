var func1 = function(message) {
	alert(message);
}

var func2 = func1.bind(alert);
func2('Test'); // alert 'Test'

function myBind(func, context) {
	return (...args) => func.apply(context, args);
}

var func3 = myBind(func1, alert);
func3('Test'); // alert 'Test'

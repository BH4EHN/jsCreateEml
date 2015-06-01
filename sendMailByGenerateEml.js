function triggerClickEvent(element) {
	var event = document.createEvent('HTMLEvents');
	event.initEvent('click');
	element.dispatchEvent(event);
}

function base64encode(str) {
	return window.btoa(unescape(encodeURIComponent(str)));
}

function generateUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
}

function encodeChinese(str) {
	return str.replace(/[^\u0000-\u00FF]/g, function ($0) { return escape($0).replace(/(%u)(\w{4})/gi, "&#x$2;") });
}

function sendMailByGenerateEml(to, subject, content) {
	var emlContent = "data:message/rfc822 eml;charset=utf-8,";
	emlContent += 'To: ' + to + '\r\n';
	emlContent += 'Subject: =?UTF-8?B?' + base64encode(subject) + '?= \r\n';
	emlContent += 'X-Unsent: 1'+'\r\n';
	emlContent += 'Content-Type: text/html'+'\r\n';
    emlContent += 'Content-Transfer-Encoding: base64 \r\n';
	emlContent += '\r\n';
	emlContent += base64encode(content);
	
	var encodedUri = encodeURI(emlContent);
	var a = document.createElement('a');
	a.href = encodedUri;
	a.download = generateUUID() + '.eml';
	a.style = 'display: none';
	triggerClickEvent(a);
}

sendMailByGenerateEml('edyuy@zmyseries.com', document.title, document.body.innerHTML);
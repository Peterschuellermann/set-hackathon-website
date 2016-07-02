/**
 * Created by pepper on 7/2/16.
 */
/*! relayr-browser-sdk 2016-05-19 */
window.RELAYR=function(a,b){function c(a){function c(b){function c(){k.user().getUserInfo(d).then(function(){b.success(d)},function(a){b&&b.error&&"function"==typeof b.error?b.error(a):(localStorage.removeItem("relayrToken"),k.login(b))})}if(!a||!f.nonEmptyString(a.appId))throw new Error("Provide credentials: appId and redirectUri");if(!a||!f.nonEmptyString(a.redirectUri))throw new Error("Provide credentials: redirectUri");if(!b||!b.success||"function"!=typeof b.success)throw new Error("Provide the method success within your parameters");var d=localStorage.getItem("relayrToken");if(d)c();else{var e={client_id:k.credentials.appId,redirect_uri:k.credentials.redirectUri,scope:"access-own-user-info+configure-devices"};this.login.redirect(j.url+"oauth2/auth?client_id="+e.client_id+"&redirect_uri="+e.redirect_uri+"&response_type=token&scope="+e.scope)}}function d(){this.getToken=function(){function a(a){var b=a.split("#");if(!(b.length<2)){var c=b[1].split("&"),d=c.reduce(function(a,b){var c=b.split("=");return a[c[0]]=c[1],a},{});return d.access_token}}var b=a(f.getHash()),c=window.location.href,d=c.indexOf("#access_token");d>0&&(window.location=c.substring(0,d)),b&&this.setToken(b)},this.setToken=function(a){localStorage.setItem("relayrToken",a)},this.hasToken=function(){return!!localStorage.getItem("relayrToken")},this.getUserInfo=function(a){return new Promise(function(b,c){k.account?b(k.account):f.ajax({url:k.config.url+"oauth2/user-info",type:"GET",token:"Bearer "+a,isObject:!0},function(c){c.token=a,k.account=c,b(k.account)},function(a){c(a)})})},this.logout=function(){localStorage.removeItem("relayrToken")}}function e(){this.getDeviceData=function(a){return new Promise(function(b,c){a.token||k.account.token&&(a.token=k.account.token),a.token=a.token.replace("Bearer ",""),f.ajax({url:k.config.url+"channels",type:"POST",token:"Bearer "+a.token,isObject:!0,body:{transport:"mqtt",deviceId:a.deviceId}},function(b){b.cb=a.incomingData,f.mqttClient(b)},function(a){c(a),localStorage.removeItem("relayrToken"),k.login()})})},this.getDevice=function(a){if(!a||!a.deviceId)throw new Error("Provide the deviceId within your parameters");return new Promise(function(b,c){f.ajax({url:k.config.url+"devices/"+a.deviceId,type:"GET",token:"Bearer "+k.account.token,isObject:!0},function(a){b(a)},function(a){c(a)})})},this.getDeviceState=function(a){if(!a||!a.deviceId)throw new Error("Provide the deviceId within your parameters");return new Promise(function(b,c){f.ajax({url:k.config.url+"devices/"+a.deviceId+"/state",type:"GET",token:"Bearer "+k.account.token,isObject:!0},function(a){b(a)},function(a){c(a)})})},this.getAllDevices=function(){return new Promise(function(a,b){f.ajax({url:k.config.url+"users/"+k.account.id+"/devices",type:"GET",token:"Bearer "+k.account.token,isObject:!0},function(b){a(b)},function(a){b(a)})})},this.sendCommand=function(a){if(!(a&&a.deviceId&&a.command))throw new Error("Provide the deviceId and a command within your parameters");return a.token||k.account.token&&(a.token=k.account.token),a.token=a.token.replace("Bearer ",""),new Promise(function(b,c){f.ajax({url:k.config.url+"devices/"+a.deviceId+"/commands",type:"POST",token:"Bearer "+a.token,body:a.command},function(a){b(a)},function(a){c(a),localStorage.removeItem("relayrToken"),k.login()})})}}function g(){this.getAllGroups=function(){return new Promise(function(a,b){f.ajax({url:k.config.url+"users/"+k.account.id+"/groups",type:"GET",token:"Bearer "+k.account.token,isObject:!0},function(b){a(b)},function(a){b(a)})})}}function h(){this.getAllModels=function(){return new Promise(function(a,b){f.ajax({url:k.config.url+"device-models?limit=100000",type:"GET",token:"Bearer "+k.account.token,isObject:!0},function(b){a(b)},function(a){b(a)})})}}function i(){k.checkAccount(),this.getTransmitters=function(){return new Promise(function(a,b){f.ajax({url:k.config.url+"users/"+k.account.id+"/transmitters",type:"GET",token:"Bearer "+k.account.token,isObject:!0},function(b){a(b)},b)})},this.deleteTransmitter=function(a){if(!a||!a.transmitterId)throw new Error("Provide the transmitterId within your parameters");return new Promise(function(b,c){f.ajax({url:k.config.url+"transmitters/"+a.transmitterId,type:"DELETE",token:"Bearer "+k.account.token},function(a){b(a)},c)})},this.updateTransmitter=function(a){if(!a||!a.transmitterId)throw new Error("Provide the transmitterId within your parameters");return new Promise(function(b,c){f.ajax({url:k.config.url+"transmitters/"+a.transmitterId,type:"PATCH",token:"Bearer "+k.account.token,body:a,isObject:!0},function(a){b(a)},c)})}}var j={url:"https://api.relayr.io/",mqtt:"mqtt.relayr.io",mockMode:!1},k=this;k.credentials=a,k.config=j,k.checkAccount=function(){if(!k.account)throw new Error("You must be logged in to access this method.")},this.login=c,this.user=function(){return new d},this.device=function(a){return new device(a)},this.devices=function(){return new e},this.groups=function(){return new g},this.models=function(){return new h},this.transmitters=function(){return new i},this.login.redirect=function(a){b.location=a},this.util=f,function(){this.user().getToken()}.bind(this)()}function d(a){function b(a){try{var b=a._getDestinationName();b=b.split("/v1/")[1].split("/")[0];var c=a._getDestinationName().split("/v1/")[1],d=a._getPayloadString();d=JSON.parse(a._getPayloadString());for(var f=e.subscriptions.length-1;f>=0;f--)e.subscriptions[f].channelId==c&&(b=e.subscriptions[f].deviceId,e.subscriptions[f].cb&&e.subscriptions[f].cb&&"function"==typeof e.subscriptions[f].cb&&e.subscriptions[f].cb(d),e.subscriptions[f].incomingData&&e.subscriptions[f].incomingData&&"function"==typeof e.subscriptions[f].incomingData&&e.subscriptions[f].incomingData(d))}catch(g){console.log("Incoming data function error:",g)}}function c(a){console.log("Lost connection"),setTimeout(function(){e.client.isConnected=!1,e.connect(e.lastParam),e.forceDisconnect||e.connect(e.lastParam)},d)}var d=1e4,e=this;return e.subscriptions=[],e.credentials=null,e.retries=0,e.connect=function(a){if(a=e.subscriptions[0],e.credentials=a,e.client=new Paho.MQTT.Client("mqtt.relayr.io",443,"JSDK_"+Math.floor(1e3*Math.random())),e.client.onConnectionLost=c,e.client.onMessageArrived=b,e.client.isConnected=!1,e.retries++,console.log("Connecting..."),e.retries>100)throw new Error("Too many MQTT retries occured, please try later.");var d={timeout:30,keepAliveInterval:10,cleanSession:!0,useSSL:!0,userName:a.credentials.user,password:a.credentials.password,onSuccess:function(a){e.client.isConnected=!0,e.retries=0,e.subscriptions.forEach(function(a){e.client.subscribe(a.credentials.topic,0)})},onFailure:function(a){e.forceDisconnect||e.connect(e.credentials)}};e.client.connect(d)},this.disconnect=function(){if(e.forceDisconnect=!0,e.client)try{e.client.disconnect()}catch(a){}},this.subscribe=function(a){e.subscriptions.push(a)},this.cleanUp=function(){e.disconnect()},this}var e={init:function(a){return new c(a)}},f={nonEmptyString:function(a){return a&&"string"==typeof a&&a.length>0},isAFunction:function(a){return a&&"function"==typeof a},getHash:function(){return document.location.hash},ajax:function(a,b,c){var d=new XMLHttpRequest;d.onreadystatechange=function(){4===d.readyState&&(d.status>199&&d.status<299&&b(a.isObject?JSON.parse(d.responseText):d.responseText),d.status>399&&d.status<600&&c(d))},d.open(a.type,a.url,!0),d.setRequestHeader("Authorization",a.token),d.setRequestHeader("Content-Type","application/json"),a.body?d.send(JSON.stringify(a.body)):d.send()},mqttClient:function(a){return a.mqtt=new d,a.mqtt.subscribe(a),a.mqtt.connect(),a}};return e}(window,window.document),"undefined"==typeof Paho&&(Paho={}),Paho.MQTT=function(a){function b(a,b){var c=b,d=a[b],f=d>>4,g=d&=15;b+=1;var h,j=0,l=1;do{if(b==a.length)return[null,c];h=a[b++],j+=(127&h)*l,l*=128}while(0!=(128&h));var m=b+j;if(m>a.length)return[null,c];var n=new s(f);switch(f){case k.CONNACK:var o=a[b++];1&o&&(n.sessionPresent=!0),n.returnCode=a[b++];break;case k.PUBLISH:var p=g>>1&3,q=e(a,b);b+=2;var r=i(a,b,q);b+=q,p>0&&(n.messageIdentifier=e(a,b),b+=2);var t=new Paho.MQTT.Message(a.subarray(b,m));1==(1&g)&&(t.retained=!0),8==(8&g)&&(t.duplicate=!0),t.qos=p,t.destinationName=r,n.payloadMessage=t;break;case k.PUBACK:case k.PUBREC:case k.PUBREL:case k.PUBCOMP:case k.UNSUBACK:n.messageIdentifier=e(a,b);break;case k.SUBACK:n.messageIdentifier=e(a,b),b+=2,n.returnCode=a.subarray(b,m)}return[n,m]}function c(a,b,c){return b[c++]=a>>8,b[c++]=a%256,c}function d(a,b,d,e){return e=c(b,d,e),h(a,d,e),e+b}function e(a,b){return 256*a[b]+a[b+1]}function f(a){var b=new Array(1),c=0;do{var d=a%128;a>>=7,a>0&&(d|=128),b[c++]=d}while(a>0&&4>c);return b}function g(a){for(var b=0,c=0;c<a.length;c++){var d=a.charCodeAt(c);d>2047?(d>=55296&&56319>=d&&(c++,b++),b+=3):d>127?b+=2:b++}return b}function h(a,b,c){for(var d=c,e=0;e<a.length;e++){var f=a.charCodeAt(e);if(f>=55296&&56319>=f){var g=a.charCodeAt(++e);if(isNaN(g))throw new Error(p(n.MALFORMED_UNICODE,[f,g]));f=(f-55296<<10)+(g-56320)+65536}127>=f?b[d++]=f:2047>=f?(b[d++]=f>>6&31|192,b[d++]=63&f|128):65535>=f?(b[d++]=f>>12&15|224,b[d++]=f>>6&63|128,b[d++]=63&f|128):(b[d++]=f>>18&7|240,b[d++]=f>>12&63|128,b[d++]=f>>6&63|128,b[d++]=63&f|128)}return b}function i(a,b,c){for(var d,e="",f=b;b+c>f;){var g=a[f++];if(128>g)d=g;else{var h=a[f++]-128;if(0>h)throw new Error(p(n.MALFORMED_UTF,[g.toString(16),h.toString(16),""]));if(224>g)d=64*(g-192)+h;else{var i=a[f++]-128;if(0>i)throw new Error(p(n.MALFORMED_UTF,[g.toString(16),h.toString(16),i.toString(16)]));if(240>g)d=4096*(g-224)+64*h+i;else{var j=a[f++]-128;if(0>j)throw new Error(p(n.MALFORMED_UTF,[g.toString(16),h.toString(16),i.toString(16),j.toString(16)]));if(!(248>g))throw new Error(p(n.MALFORMED_UTF,[g.toString(16),h.toString(16),i.toString(16),j.toString(16)]));d=262144*(g-240)+4096*h+64*i+j}}}d>65535&&(d-=65536,e+=String.fromCharCode(55296+(d>>10)),d=56320+(1023&d)),e+=String.fromCharCode(d)}return e}var j="@VERSION@",k={CONNECT:1,CONNACK:2,PUBLISH:3,PUBACK:4,PUBREC:5,PUBREL:6,PUBCOMP:7,SUBSCRIBE:8,SUBACK:9,UNSUBSCRIBE:10,UNSUBACK:11,PINGREQ:12,PINGRESP:13,DISCONNECT:14},l=function(a,b){for(var c in a)if(a.hasOwnProperty(c)){if(!b.hasOwnProperty(c)){var d="Unknown property, "+c+". Valid properties are:";for(var c in b)b.hasOwnProperty(c)&&(d=d+" "+c);throw new Error(d)}if(typeof a[c]!==b[c])throw new Error(p(n.INVALID_TYPE,[typeof a[c],c]))}},m=function(a,b){return function(){return a.apply(b,arguments)}},n={OK:{code:0,text:"AMQJSC0000I OK."},CONNECT_TIMEOUT:{code:1,text:"AMQJSC0001E Connect timed out."},SUBSCRIBE_TIMEOUT:{code:2,text:"AMQJS0002E Subscribe timed out."},UNSUBSCRIBE_TIMEOUT:{code:3,text:"AMQJS0003E Unsubscribe timed out."},PING_TIMEOUT:{code:4,text:"AMQJS0004E Ping timed out."},INTERNAL_ERROR:{code:5,text:"AMQJS0005E Internal error. Error Message: {0}, Stack trace: {1}"},CONNACK_RETURNCODE:{code:6,text:"AMQJS0006E Bad Connack return code:{0} {1}."},SOCKET_ERROR:{code:7,text:"AMQJS0007E Socket error:{0}."},SOCKET_CLOSE:{code:8,text:"AMQJS0008I Socket closed."},MALFORMED_UTF:{code:9,text:"AMQJS0009E Malformed UTF data:{0} {1} {2}."},UNSUPPORTED:{code:10,text:"AMQJS0010E {0} is not supported by this browser."},INVALID_STATE:{code:11,text:"AMQJS0011E Invalid state {0}."},INVALID_TYPE:{code:12,text:"AMQJS0012E Invalid type {0} for {1}."},INVALID_ARGUMENT:{code:13,text:"AMQJS0013E Invalid argument {0} for {1}."},UNSUPPORTED_OPERATION:{code:14,text:"AMQJS0014E Unsupported operation."},INVALID_STORED_DATA:{code:15,text:"AMQJS0015E Invalid data in local storage key={0} value={1}."},INVALID_MQTT_MESSAGE_TYPE:{code:16,text:"AMQJS0016E Invalid MQTT message type {0}."},MALFORMED_UNICODE:{code:17,text:"AMQJS0017E Malformed Unicode string:{0} {1}."}},o={0:"Connection Accepted",1:"Connection Refused: unacceptable protocol version",2:"Connection Refused: identifier rejected",3:"Connection Refused: server unavailable",4:"Connection Refused: bad user name or password",5:"Connection Refused: not authorized"},p=function(a,b){var c=a.text;if(b)for(var d,e,f=0;f<b.length;f++)if(d="{"+f+"}",e=c.indexOf(d),e>0){var g=c.substring(0,e),h=c.substring(e+d.length);c=g+b[f]+h}return c},q=[0,6,77,81,73,115,100,112,3],r=[0,4,77,81,84,84,4],s=function(a,b){this.type=a;for(var c in b)b.hasOwnProperty(c)&&(this[c]=b[c])};s.prototype.encode=function(){var a=(15&this.type)<<4,b=0,e=new Array,h=0;switch(void 0!=this.messageIdentifier&&(b+=2),this.type){case k.CONNECT:switch(this.mqttVersion){case 3:b+=q.length+3;break;case 4:b+=r.length+3}if(b+=g(this.clientId)+2,void 0!=this.willMessage){b+=g(this.willMessage.destinationName)+2;var i=this.willMessage.payloadBytes;i instanceof Uint8Array||(i=new Uint8Array(l)),b+=i.byteLength+2}void 0!=this.userName&&(b+=g(this.userName)+2),void 0!=this.password&&(b+=g(this.password)+2);break;case k.SUBSCRIBE:a|=2;for(var j=0;j<this.topics.length;j++)e[j]=g(this.topics[j]),b+=e[j]+2;b+=this.requestedQos.length;break;case k.UNSUBSCRIBE:a|=2;for(var j=0;j<this.topics.length;j++)e[j]=g(this.topics[j]),b+=e[j]+2;break;case k.PUBREL:a|=2;break;case k.PUBLISH:this.payloadMessage.duplicate&&(a|=8),a=a|=this.payloadMessage.qos<<1,this.payloadMessage.retained&&(a|=1),h=g(this.payloadMessage.destinationName),b+=h+2;var l=this.payloadMessage.payloadBytes;b+=l.byteLength,l instanceof ArrayBuffer?l=new Uint8Array(l):l instanceof Uint8Array||(l=new Uint8Array(l.buffer));break;case k.DISCONNECT:}var m=f(b),n=m.length+1,o=new ArrayBuffer(b+n),p=new Uint8Array(o);if(p[0]=a,p.set(m,1),this.type==k.PUBLISH)n=d(this.payloadMessage.destinationName,h,p,n);else if(this.type==k.CONNECT){switch(this.mqttVersion){case 3:p.set(q,n),n+=q.length;break;case 4:p.set(r,n),n+=r.length}var s=0;this.cleanSession&&(s=2),void 0!=this.willMessage&&(s|=4,s|=this.willMessage.qos<<3,this.willMessage.retained&&(s|=32)),void 0!=this.userName&&(s|=128),void 0!=this.password&&(s|=64),p[n++]=s,n=c(this.keepAliveInterval,p,n)}switch(void 0!=this.messageIdentifier&&(n=c(this.messageIdentifier,p,n)),this.type){case k.CONNECT:n=d(this.clientId,g(this.clientId),p,n),void 0!=this.willMessage&&(n=d(this.willMessage.destinationName,g(this.willMessage.destinationName),p,n),n=c(i.byteLength,p,n),p.set(i,n),n+=i.byteLength),void 0!=this.userName&&(n=d(this.userName,g(this.userName),p,n)),void 0!=this.password&&(n=d(this.password,g(this.password),p,n));break;case k.PUBLISH:p.set(l,n);break;case k.SUBSCRIBE:for(var j=0;j<this.topics.length;j++)n=d(this.topics[j],e[j],p,n),p[n++]=this.requestedQos[j];break;case k.UNSUBSCRIBE:for(var j=0;j<this.topics.length;j++)n=d(this.topics[j],e[j],p,n)}return o};var t=function(a,b,c){this._client=a,this._window=b,this._keepAliveInterval=1e3*c,this.isReset=!1;var d=new s(k.PINGREQ).encode(),e=function(a){return function(){return f.apply(a)}},f=function(){this.isReset?(this.isReset=!1,this._client._trace("Pinger.doPing","send PINGREQ"),this._client.socket.send(d),this.timeout=this._window.setTimeout(e(this),this._keepAliveInterval)):(this._client._trace("Pinger.doPing","Timed out"),this._client._disconnected(n.PING_TIMEOUT.code,p(n.PING_TIMEOUT)))};this.reset=function(){this.isReset=!0,this._window.clearTimeout(this.timeout),this._keepAliveInterval>0&&(this.timeout=setTimeout(e(this),this._keepAliveInterval))},this.cancel=function(){this._window.clearTimeout(this.timeout)}},u=function(a,b,c,d,e){this._window=b,c||(c=30);var f=function(a,b,c){return function(){return a.apply(b,c)}};this.timeout=setTimeout(f(d,a,e),1e3*c),this.cancel=function(){this._window.clearTimeout(this.timeout)}},v=function(b,c,d,e,f){if(!("WebSocket"in a&&null!==a.WebSocket))throw new Error(p(n.UNSUPPORTED,["WebSocket"]));if(!("localStorage"in a&&null!==a.localStorage))throw new Error(p(n.UNSUPPORTED,["localStorage"]));if(!("ArrayBuffer"in a&&null!==a.ArrayBuffer))throw new Error(p(n.UNSUPPORTED,["ArrayBuffer"]));this._trace("Paho.MQTT.Client",b,c,d,e,f),this.host=c,this.port=d,this.path=e,this.uri=b,this.clientId=f,this._localKey=c+":"+d+("/mqtt"!=e?":"+e:"")+":"+f+":",this._msg_queue=[],this._sentMessages={},this._receivedMessages={},this._notify_msg_sent={},this._message_identifier=1,this._sequence=0;for(var g in localStorage)(0==g.indexOf("Sent:"+this._localKey)||0==g.indexOf("Received:"+this._localKey))&&this.restore(g)};v.prototype.host,v.prototype.port,v.prototype.path,v.prototype.uri,v.prototype.clientId,v.prototype.socket,v.prototype.connected=!1,v.prototype.maxMessageIdentifier=65536,v.prototype.connectOptions,v.prototype.hostIndex,v.prototype.onConnectionLost,v.prototype.onMessageDelivered,v.prototype.onMessageArrived,v.prototype.traceFunction,v.prototype._msg_queue=null,v.prototype._connectTimeout,v.prototype.sendPinger=null,v.prototype.receivePinger=null,v.prototype.receiveBuffer=null,v.prototype._traceBuffer=null,v.prototype._MAX_TRACE_ENTRIES=100,v.prototype.connect=function(a){var b=this._traceMask(a,"password");if(this._trace("Client.connect",b,this.socket,this.connected),this.connected)throw new Error(p(n.INVALID_STATE,["already connected"]));if(this.socket)throw new Error(p(n.INVALID_STATE,["already connected"]));this.connectOptions=a,a.uris?(this.hostIndex=0,this._doConnect(a.uris[0])):this._doConnect(this.uri)},v.prototype.subscribe=function(a,b){if(this._trace("Client.subscribe",a,b),!this.connected)throw new Error(p(n.INVALID_STATE,["not connected"]));var c=new s(k.SUBSCRIBE);c.topics=[a],void 0!=b.qos?c.requestedQos=[b.qos]:c.requestedQos=[0],b.onSuccess&&(c.onSuccess=function(a){b.onSuccess({invocationContext:b.invocationContext,grantedQos:a})}),b.onFailure&&(c.onFailure=function(a){b.onFailure({invocationContext:b.invocationContext,errorCode:a})}),b.timeout&&(c.timeOut=new u(this,window,b.timeout,b.onFailure,[{invocationContext:b.invocationContext,errorCode:n.SUBSCRIBE_TIMEOUT.code,errorMessage:p(n.SUBSCRIBE_TIMEOUT)}])),this._requires_ack(c),this._schedule_message(c)},v.prototype.unsubscribe=function(a,b){if(this._trace("Client.unsubscribe",a,b),!this.connected)throw new Error(p(n.INVALID_STATE,["not connected"]));var c=new s(k.UNSUBSCRIBE);c.topics=[a],b.onSuccess&&(c.callback=function(){b.onSuccess({invocationContext:b.invocationContext})}),b.timeout&&(c.timeOut=new u(this,window,b.timeout,b.onFailure,[{invocationContext:b.invocationContext,errorCode:n.UNSUBSCRIBE_TIMEOUT.code,errorMessage:p(n.UNSUBSCRIBE_TIMEOUT)}])),this._requires_ack(c),this._schedule_message(c)},v.prototype.send=function(a){if(this._trace("Client.send",a),!this.connected)throw new Error(p(n.INVALID_STATE,["not connected"]));wireMessage=new s(k.PUBLISH),wireMessage.payloadMessage=a,a.qos>0?this._requires_ack(wireMessage):this.onMessageDelivered&&(this._notify_msg_sent[wireMessage]=this.onMessageDelivered(wireMessage.payloadMessage)),this._schedule_message(wireMessage)},v.prototype.disconnect=function(){if(this._trace("Client.disconnect"),!this.socket)throw new Error(p(n.INVALID_STATE,["not connecting or connected"]));wireMessage=new s(k.DISCONNECT),this._notify_msg_sent[wireMessage]=m(this._disconnected,this),this._schedule_message(wireMessage)},v.prototype.getTraceLog=function(){if(null!==this._traceBuffer){this._trace("Client.getTraceLog",new Date),this._trace("Client.getTraceLog in flight messages",this._sentMessages.length);for(var a in this._sentMessages)this._trace("_sentMessages ",a,this._sentMessages[a]);for(var a in this._receivedMessages)this._trace("_receivedMessages ",a,this._receivedMessages[a]);return this._traceBuffer}},v.prototype.startTrace=function(){null===this._traceBuffer&&(this._traceBuffer=[]),this._trace("Client.startTrace",new Date,j)},v.prototype.stopTrace=function(){delete this._traceBuffer},v.prototype._doConnect=function(a){if(this.connectOptions.useSSL){var b=a.split(":");b[0]="wss",a=b.join(":")}this.connected=!1,this.connectOptions.mqttVersion<4?this.socket=new WebSocket(a,["mqttv3.1"]):this.socket=new WebSocket(a,["mqtt"]),this.socket.binaryType="arraybuffer",this.socket.onopen=m(this._on_socket_open,this),this.socket.onmessage=m(this._on_socket_message,this),this.socket.onerror=m(this._on_socket_error,this),this.socket.onclose=m(this._on_socket_close,this),this.sendPinger=new t(this,window,this.connectOptions.keepAliveInterval),this.receivePinger=new t(this,window,this.connectOptions.keepAliveInterval),this._connectTimeout=new u(this,window,this.connectOptions.timeout,this._disconnected,[n.CONNECT_TIMEOUT.code,p(n.CONNECT_TIMEOUT)])},v.prototype._schedule_message=function(a){this._msg_queue.push(a),this.connected&&this._process_queue()},v.prototype.store=function(a,b){var c={type:b.type,messageIdentifier:b.messageIdentifier,version:1};switch(b.type){case k.PUBLISH:b.pubRecReceived&&(c.pubRecReceived=!0),c.payloadMessage={};for(var d="",e=b.payloadMessage.payloadBytes,f=0;f<e.length;f++)e[f]<=15?d=d+"0"+e[f].toString(16):d+=e[f].toString(16);c.payloadMessage.payloadHex=d,c.payloadMessage.qos=b.payloadMessage.qos,c.payloadMessage.destinationName=b.payloadMessage.destinationName,b.payloadMessage.duplicate&&(c.payloadMessage.duplicate=!0),b.payloadMessage.retained&&(c.payloadMessage.retained=!0),0==a.indexOf("Sent:")&&(void 0===b.sequence&&(b.sequence=++this._sequence),c.sequence=b.sequence);break;default:throw Error(p(n.INVALID_STORED_DATA,[key,c]))}localStorage.setItem(a+this._localKey+b.messageIdentifier,JSON.stringify(c))},v.prototype.restore=function(a){var b=localStorage.getItem(a),c=JSON.parse(b),d=new s(c.type,c);switch(c.type){case k.PUBLISH:for(var e=c.payloadMessage.payloadHex,f=new ArrayBuffer(e.length/2),g=new Uint8Array(f),h=0;e.length>=2;){var i=parseInt(e.substring(0,2),16);e=e.substring(2,e.length),g[h++]=i}var j=new Paho.MQTT.Message(g);j.qos=c.payloadMessage.qos,j.destinationName=c.payloadMessage.destinationName,c.payloadMessage.duplicate&&(j.duplicate=!0),c.payloadMessage.retained&&(j.retained=!0),d.payloadMessage=j;break;default:throw Error(p(n.INVALID_STORED_DATA,[a,b]))}0==a.indexOf("Sent:"+this._localKey)?(d.payloadMessage.duplicate=!0,this._sentMessages[d.messageIdentifier]=d):0==a.indexOf("Received:"+this._localKey)&&(this._receivedMessages[d.messageIdentifier]=d)},v.prototype._process_queue=function(){for(var a=null,b=this._msg_queue.reverse();a=b.pop();)this._socket_send(a),this._notify_msg_sent[a]&&(this._notify_msg_sent[a](),delete this._notify_msg_sent[a])},v.prototype._requires_ack=function(a){var b=Object.keys(this._sentMessages).length;if(b>this.maxMessageIdentifier)throw Error("Too many messages:"+b);for(;void 0!==this._sentMessages[this._message_identifier];)this._message_identifier++;a.messageIdentifier=this._message_identifier,this._sentMessages[a.messageIdentifier]=a,a.type===k.PUBLISH&&this.store("Sent:",a),this._message_identifier===this.maxMessageIdentifier&&(this._message_identifier=1)},v.prototype._on_socket_open=function(){var a=new s(k.CONNECT,this.connectOptions);a.clientId=this.clientId,this._socket_send(a)},v.prototype._on_socket_message=function(a){this._trace("Client._on_socket_message",a.data),this.receivePinger.reset();for(var b=this._deframeMessages(a.data),c=0;c<b.length;c+=1)this._handleMessage(b[c])},v.prototype._deframeMessages=function(a){var c=new Uint8Array(a);if(this.receiveBuffer){var d=new Uint8Array(this.receiveBuffer.length+c.length);d.set(this.receiveBuffer),d.set(c,this.receiveBuffer.length),c=d,delete this.receiveBuffer}try{for(var e=0,f=[];e<c.length;){var g=b(c,e),h=g[0];if(e=g[1],null===h)break;f.push(h)}e<c.length&&(this.receiveBuffer=c.subarray(e))}catch(i){return void this._disconnected(n.INTERNAL_ERROR.code,p(n.INTERNAL_ERROR,[i.message,i.stack.toString()]))}return f},v.prototype._handleMessage=function(a){switch(this._trace("Client._handleMessage",a),a.type){case k.CONNACK:if(this._connectTimeout.cancel(),this.connectOptions.cleanSession){for(var b in this._sentMessages){var c=this._sentMessages[b];localStorage.removeItem("Sent:"+this._localKey+c.messageIdentifier)}this._sentMessages={};for(var b in this._receivedMessages){var d=this._receivedMessages[b];localStorage.removeItem("Received:"+this._localKey+d.messageIdentifier)}this._receivedMessages={}}if(0!==a.returnCode){this._disconnected(n.CONNACK_RETURNCODE.code,p(n.CONNACK_RETURNCODE,[a.returnCode,o[a.returnCode]]));break}this.connected=!0,this.connectOptions.uris&&(this.hostIndex=this.connectOptions.uris.length);var e=new Array;for(var f in this._sentMessages)this._sentMessages.hasOwnProperty(f)&&e.push(this._sentMessages[f]);for(var e=e.sort(function(a,b){return a.sequence-b.sequence}),g=0,h=e.length;h>g;g++){var c=e[g];if(c.type==k.PUBLISH&&c.pubRecReceived){var i=new s(k.PUBREL,{messageIdentifier:c.messageIdentifier});this._schedule_message(i)}else this._schedule_message(c)}this.connectOptions.onSuccess&&this.connectOptions.onSuccess({invocationContext:this.connectOptions.invocationContext}),this._process_queue();break;case k.PUBLISH:this._receivePublish(a);break;case k.PUBACK:var c=this._sentMessages[a.messageIdentifier];c&&(delete this._sentMessages[a.messageIdentifier],localStorage.removeItem("Sent:"+this._localKey+a.messageIdentifier),this.onMessageDelivered&&this.onMessageDelivered(c.payloadMessage));break;case k.PUBREC:var c=this._sentMessages[a.messageIdentifier];if(c){c.pubRecReceived=!0;var i=new s(k.PUBREL,{messageIdentifier:a.messageIdentifier});this.store("Sent:",c),this._schedule_message(i)}break;case k.PUBREL:var d=this._receivedMessages[a.messageIdentifier];localStorage.removeItem("Received:"+this._localKey+a.messageIdentifier),d&&(this._receiveMessage(d),delete this._receivedMessages[a.messageIdentifier]);var j=new s(k.PUBCOMP,{messageIdentifier:a.messageIdentifier});this._schedule_message(j);break;case k.PUBCOMP:var c=this._sentMessages[a.messageIdentifier];delete this._sentMessages[a.messageIdentifier],localStorage.removeItem("Sent:"+this._localKey+a.messageIdentifier),this.onMessageDelivered&&this.onMessageDelivered(c.payloadMessage);break;case k.SUBACK:var c=this._sentMessages[a.messageIdentifier];c&&(c.timeOut&&c.timeOut.cancel(),a.returnCode.indexOf=Array.prototype.indexOf,-1!==a.returnCode.indexOf(128)?c.onFailure&&c.onFailure(a.returnCode):c.onSuccess&&c.onSuccess(a.returnCode),delete this._sentMessages[a.messageIdentifier]);break;case k.UNSUBACK:var c=this._sentMessages[a.messageIdentifier];c&&(c.timeOut&&c.timeOut.cancel(),c.callback&&c.callback(),delete this._sentMessages[a.messageIdentifier]);break;case k.PINGRESP:this.sendPinger.reset();break;case k.DISCONNECT:this._disconnected(n.INVALID_MQTT_MESSAGE_TYPE.code,p(n.INVALID_MQTT_MESSAGE_TYPE,[a.type]));break;default:this._disconnected(n.INVALID_MQTT_MESSAGE_TYPE.code,p(n.INVALID_MQTT_MESSAGE_TYPE,[a.type]))}},v.prototype._on_socket_error=function(a){this._disconnected(n.SOCKET_ERROR.code,p(n.SOCKET_ERROR,[a.data]))},v.prototype._on_socket_close=function(){this._disconnected(n.SOCKET_CLOSE.code,p(n.SOCKET_CLOSE))},v.prototype._socket_send=function(a){if(1==a.type){var b=this._traceMask(a,"password");this._trace("Client._socket_send",b)}else this._trace("Client._socket_send",a);this.socket.send(a.encode()),this.sendPinger.reset()},v.prototype._receivePublish=function(a){switch(a.payloadMessage.qos){case"undefined":case 0:this._receiveMessage(a);break;case 1:var b=new s(k.PUBACK,{messageIdentifier:a.messageIdentifier});this._schedule_message(b),this._receiveMessage(a);break;case 2:this._receivedMessages[a.messageIdentifier]=a,this.store("Received:",a);var c=new s(k.PUBREC,{messageIdentifier:a.messageIdentifier});this._schedule_message(c);break;default:throw Error("Invaild qos="+wireMmessage.payloadMessage.qos)}},v.prototype._receiveMessage=function(a){this.onMessageArrived&&this.onMessageArrived(a.payloadMessage)},v.prototype._disconnected=function(a,b){this._trace("Client._disconnected",a,b),this.sendPinger.cancel(),this.receivePinger.cancel(),this._connectTimeout&&this._connectTimeout.cancel(),this._msg_queue=[],this._notify_msg_sent={},this.socket&&(this.socket.onopen=null,this.socket.onmessage=null,this.socket.onerror=null,this.socket.onclose=null,1===this.socket.readyState&&this.socket.close(),delete this.socket),this.connectOptions.uris&&this.hostIndex<this.connectOptions.uris.length-1?(this.hostIndex++,this._doConnect(this.connectOptions.uris[this.hostIndex])):(void 0===a&&(a=n.OK.code,b=p(n.OK)),this.connected?(this.connected=!1,this.onConnectionLost&&this.onConnectionLost({errorCode:a,errorMessage:b})):4===this.connectOptions.mqttVersion&&this.connectOptions.mqttVersionExplicit===!1?(this._trace("Failed to connect V4, dropping back to V3"),this.connectOptions.mqttVersion=3,this.connectOptions.uris?(this.hostIndex=0,this._doConnect(this.connectOptions.uris[0])):this._doConnect(this.uri)):this.connectOptions.onFailure&&this.connectOptions.onFailure({invocationContext:this.connectOptions.invocationContext,errorCode:a,errorMessage:b}))},v.prototype._trace=function(){if(this.traceFunction){for(var a in arguments)"undefined"!=typeof arguments[a]&&(arguments[a]=JSON.stringify(arguments[a]));var b=Array.prototype.slice.call(arguments).join("");this.traceFunction({severity:"Debug",message:b})}if(null!==this._traceBuffer)for(var a=0,c=arguments.length;c>a;a++)this._traceBuffer.length==this._MAX_TRACE_ENTRIES&&this._traceBuffer.shift(),0===a?this._traceBuffer.push(arguments[a]):"undefined"==typeof arguments[a]?this._traceBuffer.push(arguments[a]):this._traceBuffer.push("  "+JSON.stringify(arguments[a]))},v.prototype._traceMask=function(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(d==b?c[d]="******":c[d]=a[d]);return c};var w=function(a,b,c,d){var e;if("string"!=typeof a)throw new Error(p(n.INVALID_TYPE,[typeof a,"host"]));if(2==arguments.length){d=b,e=a;var f=e.match(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/);if(!f)throw new Error(p(n.INVALID_ARGUMENT,[a,"host"]));a=f[4]||f[2],b=parseInt(f[7]),c=f[8]}else{if(3==arguments.length&&(d=c,c="/mqtt"),"number"!=typeof b||0>b)throw new Error(p(n.INVALID_TYPE,[typeof b,"port"]));if("string"!=typeof c)throw new Error(p(n.INVALID_TYPE,[typeof c,"path"]));var g=-1!=a.indexOf(":")&&"["!=a.slice(0,1)&&"]"!=a.slice(-1);e="ws://"+(g?"["+a+"]":a)+":"+b+c}for(var h=0,i=0;i<d.length;i++){var j=d.charCodeAt(i);j>=55296&&56319>=j&&i++,h++}if("string"!=typeof d||h>65535)throw new Error(p(n.INVALID_ARGUMENT,[d,"clientId"]));var k=new v(e,a,b,c,d);this._getHost=function(){return a},this._setHost=function(){throw new Error(p(n.UNSUPPORTED_OPERATION))},this._getPort=function(){return b},this._setPort=function(){throw new Error(p(n.UNSUPPORTED_OPERATION))},this._getPath=function(){return c},this._setPath=function(){throw new Error(p(n.UNSUPPORTED_OPERATION))},this._getURI=function(){return e},this._setURI=function(){throw new Error(p(n.UNSUPPORTED_OPERATION))},this._getClientId=function(){return k.clientId},this._setClientId=function(){throw new Error(p(n.UNSUPPORTED_OPERATION))},this._getOnConnectionLost=function(){return k.onConnectionLost},this._setOnConnectionLost=function(a){if("function"!=typeof a)throw new Error(p(n.INVALID_TYPE,[typeof a,"onConnectionLost"]));k.onConnectionLost=a},this._getOnMessageDelivered=function(){return k.onMessageDelivered},this._setOnMessageDelivered=function(a){if("function"!=typeof a)throw new Error(p(n.INVALID_TYPE,[typeof a,"onMessageDelivered"]));k.onMessageDelivered=a},this._getOnMessageArrived=function(){return k.onMessageArrived},this._setOnMessageArrived=function(a){if("function"!=typeof a)throw new Error(p(n.INVALID_TYPE,[typeof a,"onMessageArrived"]));k.onMessageArrived=a},this._getTrace=function(){return k.traceFunction},this._setTrace=function(a){if("function"!=typeof a)throw new Error(p(n.INVALID_TYPE,[typeof a,"onTrace"]));k.traceFunction=a},this.connect=function(a){if(a=a||{},l(a,{timeout:"number",userName:"string",password:"string",willMessage:"object",keepAliveInterval:"number",cleanSession:"boolean",useSSL:"boolean",invocationContext:"object",onSuccess:"function",onFailure:"function",hosts:"object",ports:"object",mqttVersion:"number"}),void 0===a.keepAliveInterval&&(a.keepAliveInterval=60),a.mqttVersion>4||a.mqttVersion<3)throw new Error(p(n.INVALID_ARGUMENT,[a.mqttVersion,"connectOptions.mqttVersion"]));
if(void 0===a.mqttVersion?(a.mqttVersionExplicit=!1,a.mqttVersion=4):a.mqttVersionExplicit=!0,void 0===a.password&&void 0!==a.userName)throw new Error(p(n.INVALID_ARGUMENT,[a.password,"connectOptions.password"]));if(a.willMessage){if(!(a.willMessage instanceof x))throw new Error(p(n.INVALID_TYPE,[a.willMessage,"connectOptions.willMessage"]));if(a.willMessage.stringPayload,"undefined"==typeof a.willMessage.destinationName)throw new Error(p(n.INVALID_TYPE,[typeof a.willMessage.destinationName,"connectOptions.willMessage.destinationName"]))}if("undefined"==typeof a.cleanSession&&(a.cleanSession=!0),a.hosts){if(!(a.hosts instanceof Array))throw new Error(p(n.INVALID_ARGUMENT,[a.hosts,"connectOptions.hosts"]));if(a.hosts.length<1)throw new Error(p(n.INVALID_ARGUMENT,[a.hosts,"connectOptions.hosts"]));for(var b=!1,d=0;d<a.hosts.length;d++){if("string"!=typeof a.hosts[d])throw new Error(p(n.INVALID_TYPE,[typeof a.hosts[d],"connectOptions.hosts["+d+"]"]));if(/^(wss?):\/\/((\[(.+)\])|([^\/]+?))(:(\d+))?(\/.*)$/.test(a.hosts[d])){if(0==d)b=!0;else if(!b)throw new Error(p(n.INVALID_ARGUMENT,[a.hosts[d],"connectOptions.hosts["+d+"]"]))}else if(b)throw new Error(p(n.INVALID_ARGUMENT,[a.hosts[d],"connectOptions.hosts["+d+"]"]))}if(b)a.uris=a.hosts;else{if(!a.ports)throw new Error(p(n.INVALID_ARGUMENT,[a.ports,"connectOptions.ports"]));if(!(a.ports instanceof Array))throw new Error(p(n.INVALID_ARGUMENT,[a.ports,"connectOptions.ports"]));if(a.hosts.length!=a.ports.length)throw new Error(p(n.INVALID_ARGUMENT,[a.ports,"connectOptions.ports"]));a.uris=[];for(var d=0;d<a.hosts.length;d++){if("number"!=typeof a.ports[d]||a.ports[d]<0)throw new Error(p(n.INVALID_TYPE,[typeof a.ports[d],"connectOptions.ports["+d+"]"]));var f=a.hosts[d],g=a.ports[d],h=-1!=f.indexOf(":");e="ws://"+(h?"["+f+"]":f)+":"+g+c,a.uris.push(e)}}}k.connect(a)},this.subscribe=function(a,b){if("string"!=typeof a)throw new Error("Invalid argument:"+a);if(b=b||{},l(b,{qos:"number",invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"}),b.timeout&&!b.onFailure)throw new Error("subscribeOptions.timeout specified with no onFailure callback.");if("undefined"!=typeof b.qos&&0!==b.qos&&1!==b.qos&&2!==b.qos)throw new Error(p(n.INVALID_ARGUMENT,[b.qos,"subscribeOptions.qos"]));k.subscribe(a,b)},this.unsubscribe=function(a,b){if("string"!=typeof a)throw new Error("Invalid argument:"+a);if(b=b||{},l(b,{invocationContext:"object",onSuccess:"function",onFailure:"function",timeout:"number"}),b.timeout&&!b.onFailure)throw new Error("unsubscribeOptions.timeout specified with no onFailure callback.");k.unsubscribe(a,b)},this.send=function(a,b,c,d){var e;if(0==arguments.length)throw new Error("Invalid argument.length");if(1==arguments.length){if(!(a instanceof x)&&"string"!=typeof a)throw new Error("Invalid argument:"+typeof a);if(e=a,"undefined"==typeof e.destinationName)throw new Error(p(n.INVALID_ARGUMENT,[e.destinationName,"Message.destinationName"]));k.send(e)}else e=new x(b),e.destinationName=a,arguments.length>=3&&(e.qos=c),arguments.length>=4&&(e.retained=d),k.send(e)},this.disconnect=function(){k.disconnect()},this.getTraceLog=function(){return k.getTraceLog()},this.startTrace=function(){k.startTrace()},this.stopTrace=function(){k.stopTrace()},this.isConnected=function(){return k.connected}};w.prototype={get host(){return this._getHost()},set host(a){this._setHost(a)},get port(){return this._getPort()},set port(a){this._setPort(a)},get path(){return this._getPath()},set path(a){this._setPath(a)},get clientId(){return this._getClientId()},set clientId(a){this._setClientId(a)},get onConnectionLost(){return this._getOnConnectionLost()},set onConnectionLost(a){this._setOnConnectionLost(a)},get onMessageDelivered(){return this._getOnMessageDelivered()},set onMessageDelivered(a){this._setOnMessageDelivered(a)},get onMessageArrived(){return this._getOnMessageArrived()},set onMessageArrived(a){this._setOnMessageArrived(a)},get trace(){return this._getTrace()},set trace(a){this._setTrace(a)}};var x=function(a){var b;if(!("string"==typeof a||a instanceof ArrayBuffer||a instanceof Int8Array||a instanceof Uint8Array||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array))throw p(n.INVALID_ARGUMENT,[a,"newPayload"]);b=a,this._getPayloadString=function(){return"string"==typeof b?b:i(b,0,b.length)},this._getPayloadBytes=function(){if("string"==typeof b){var a=new ArrayBuffer(g(b)),c=new Uint8Array(a);return h(b,c,0),c}return b};var c=void 0;this._getDestinationName=function(){return c},this._setDestinationName=function(a){if("string"!=typeof a)throw new Error(p(n.INVALID_ARGUMENT,[a,"newDestinationName"]));c=a};var d=0;this._getQos=function(){return d},this._setQos=function(a){if(0!==a&&1!==a&&2!==a)throw new Error("Invalid argument:"+a);d=a};var e=!1;this._getRetained=function(){return e},this._setRetained=function(a){if("boolean"!=typeof a)throw new Error(p(n.INVALID_ARGUMENT,[a,"newRetained"]));e=a};var f=!1;this._getDuplicate=function(){return f},this._setDuplicate=function(a){f=a}};return x.prototype={get payloadString(){return this._getPayloadString()},get payloadBytes(){return this._getPayloadBytes()},get destinationName(){return this._getDestinationName()},set destinationName(a){this._setDestinationName(a)},get qos(){return this._getQos()},set qos(a){this._setQos(a)},get retained(){return this._getRetained()},set retained(a){this._setRetained(a)},get duplicate(){return this._getDuplicate()},set duplicate(a){this._setDuplicate(a)}},{Client:w,Message:x}}(window);

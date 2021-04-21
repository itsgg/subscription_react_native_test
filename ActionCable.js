import { Platform } from 'react-native';
import ActionCable from 'actioncable';

ActionCable.getConfig = () => null;
ActionCable.createWebSocketURL = url => url.replace(/^http/, 'ws');

const oldOpen = ActionCable.Connection.prototype.open;
ActionCable.Connection.prototype.open = function() {
  const result = oldOpen.apply(this);
  this.webSocket.protocol = 'actioncable-v1-json';
  return result;
};

if (Platform.OS == 'ios' || Platform.OS == 'android') {
  if (global.document === undefined) {
    global.document = {
      addEventListener() {},
      removeEventListener() {},
    };
  }

  global.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ = '';
}

export default ActionCable;

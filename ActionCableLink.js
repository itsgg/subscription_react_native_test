import { Observable, ApolloLink } from 'apollo-link';
import { print } from 'graphql/language/printer';

const ActionCableLink = options => {
  let cable = options.cable;
  let channelName = options.channelName || 'GraphqlChannel';
  let actionName = options.actionName || 'execute';
  let connectionParams = options.connectionParams;

  if (typeof connectionParams !== 'object') {
    connectionParams = {};
  }

  return new ApolloLink(function(operation) {
    return new Observable(function(observer) {
      let channelId = Math.round(Date.now() + Math.random() * 100000).toString(
        16,
      );

      let subscription = cable.subscriptions.create(
        Object.assign(
          {},
          {
            channel: channelName,
            channelId: channelId,
          },
          connectionParams,
        ),
        {
          connected: function() {
            this.perform(actionName, {
              query: operation.query ? print(operation.query) : null,
              variables: operation.variables,
              operationId: operation.operationId,
              operationName: operation.operationName,
            });
          },
          received: function(payload) {
            if (payload.result.data || payload.result.errors) {
              observer.next(payload.result);
            }

            if (!payload.more) {
              this.unsubscribe();
              observer.complete();
            }
          },
        },
      );

      return subscription;
    });
  });
};

export default ActionCableLink;

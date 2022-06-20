export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;

      if (type === wsInit) {
        socket = new WebSocket(
          wsUrl +
            (payload?.wsUrl ?? "") +
            (payload?.token ? "?token=" + payload.token : "")
        );
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          const { success, ...restParsedData } = parsedData;
          if (success == true) {
            dispatch({ type: onMessage, payload: restParsedData });
          } else {
            alert(`Error`);
          }
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: payload?.token };
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  };
};

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsClose,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;
      //const { user } = getState().user;

      if (type === wsInit) {
        //console.log(payload);
        socket = new WebSocket(
          wsUrl +
            (payload?.wsUrl ?? "") +
            (payload?.token ? "?token=" + payload.token : "")
        );
      }
      if (socket) {
        socket.onopen = (event) => {
          //console.log(`socket open`);
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          //console.log(`socket error`);
          dispatch({ type: onError, payload: event });
        };

        socket.onclose = (event) => {
          //console.log(`socket close`);
          dispatch({ type: onClose, payload: event });
        };

        socket.onmessage = (event) => {
          // console.log(`socket message`);
          const { data } = event;
          const parsedData = JSON.parse(data);
          // console.log(parsedData);

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

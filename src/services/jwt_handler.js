export const JwtHandler = {
    JWT_KEY: 'JWT',
    eventTarget: new EventTarget(), // Sistema de eventos local

    onChange(callback) {
        JwtHandler.eventTarget.addEventListener('onJwtChange', callback);
    },

    dispatchChangeEvent() {
        JwtHandler.eventTarget.dispatchEvent(new Event('onJwtChange'));
    },

    setJwt(value) {
        localStorage.setItem(JwtHandler.JWT_KEY, value);
        JwtHandler.dispatchChangeEvent();
    },

    clearJwt() {
        localStorage.removeItem(JwtHandler.JWT_KEY);
        JwtHandler.dispatchChangeEvent();
    },

    getJwt() {
        return localStorage.getItem(JwtHandler.JWT_KEY);
    },

    isJwtValid() {
        const token = JwtHandler.getJwt();
        if (!token) return false;

        try {
            const [, payloadBase64] = token.split('.');
            if (!payloadBase64) return false;

            const payload = JSON.parse(atob(payloadBase64));

            // Apenas verifica se o token foi decodificado corretamente
            return !!payload;
        } catch {
            return false; // Retorna falso se houver erro no parse
        }
    },
};

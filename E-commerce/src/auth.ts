interface AuthState {
    isAuthenticated: boolean;
    user: null | { 
        username: string;
        role: string;
        lastLogin: string;
    };
}

export const auth = {
    state: (): AuthState => ({
        isAuthenticated: false,
        user: null
    }),
    mutations: {
        SET_AUTH(state: AuthState, auth: boolean) {
            state.isAuthenticated = auth;
        },
        SET_USER(state: AuthState, user: AuthState['user']) {
            state.user = user;
        }
    },
    actions: {
        initializeAuth({ commit }: any) {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                const user = JSON.parse(savedUser);
                commit('SET_AUTH', true);
                commit('SET_USER', user);
            }
        },
        login({ commit }: any, credentials: { username: string; password: string }): boolean {
            const ADMIN_USERNAME = 'admin6618';
            const ADMIN_PASSWORD = 'admin*277353';
        
            if (
                credentials.username === ADMIN_USERNAME && 
                credentials.password === ADMIN_PASSWORD
            ) {
                const userData = {
                    username: ADMIN_USERNAME,
                    role: 'admin',
                    lastLogin: new Date().toISOString(),
                };
        
                localStorage.setItem('user', JSON.stringify(userData));
                commit('SET_AUTH', true);
                commit('SET_USER', userData);
                return true;
            }
        
            // Retorna false si las credenciales no son válidas
            return false;
        },
    },
    getters: {
        isAuthenticated: (state: AuthState) => state.isAuthenticated,
        user: (state: AuthState) => state.user,
        userRole: (state: AuthState) => state.user?.role
    }
};
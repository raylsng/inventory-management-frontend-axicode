export function createPiniaMiddleware() {
    return (context) => {
        context.store.$onAction(({ name, store, args, after, onError}) => {
            console.log(`Action "${name}" in store "${store.$id}" with args:`, args);
            // Proteksi state berdasarkan user role
            const userRole = localStorage.getItem('role');
            const protectedActions = ['addItem', 'updateItem', 'deleteItem'];
            if (protectedActions.includes(name) && userRole !== 'WH_OPERATOR') { //changed from userRole !== 'PH_OPERATOR'
                console.error(`Unauthorized action "${name}" attempted by role "${userRole}"`);
                throw new Error('Unauthorized action for PH Operator');
            } 
            after((result) => {
                console.log(`Action "${name}" completed with result:`, result);
            });
            onError((error) => {
                console.error(`Action "${name}" failed with error:`, error);
            });
        });
    };
}
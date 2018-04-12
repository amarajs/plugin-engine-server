module.exports = function AmaraPluginEngineServer(server) {

    const features = new Set();
    const rx = /^(GET|PUT|POST|DELETE|PATCH)\s+?(.*)$/i;

    function matchesRequest(target) {
        const {path, method} = this;
        const [full, verb = '', route = '*'] = (rx.exec(target) || []);
        const matchesRoute = new RegExp(route
            .replace(/\*/g, '.*?')
            .replace(/(\.\*\?){2}/g, `.*?`), 'i');
        return verb === method && matchesRoute.test(path);
    }

    function enqueueMatchingTargets(feature) {
        if (feature.targets.some(matchesRequest, this.ctx.request)) {
            this.promises.push(new Promise(resolve => {
                this.ctx.state.resolve[feature.type] = resolve;
            }));
            this.queue.push({feature, targets: [this.ctx]});
        }
    }

    function isTargetMatch(data) {
        data.matches = data.targets.some(matchesRequest, data);
    }

    return function createHandler(dispatch) {

        function middleware(ctx, next) {
            const queue = [];
            const promises = [];
            ctx.state.resolve = {};
            features.forEach(enqueueMatchingTargets, {ctx, queue, promises});
            if (queue.length) {
                dispatch({
                    type: 'core:enqueue-apply',
                    payload: queue
                });
                return Promise.all(promises);
            }
            return next();
        }

        server.use(middleware);

        return function handle(action) {
            switch(action.type) {
            case 'server:is-target-match':
                isTargetMatch(action.payload);
                break;
            case 'core:features-added':
                action.payload.forEach(features.add, features);
                break;
            case 'core:bootstrap':
                server.listen(action.payload.target);
                break;
            }
        };

    };

};

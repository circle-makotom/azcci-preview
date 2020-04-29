import { ExpressWrapper } from './ExpressWrapper';

const mainPromise: Promise<
    ExpressWrapper['httpServers']
> = new ExpressWrapper().startListening();

mainPromise.catch((err) => console.error(err));

export { mainPromise };

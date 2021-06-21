import { expose } from 'threads/worker';

const hello = () => 'world';

expose({ hello });

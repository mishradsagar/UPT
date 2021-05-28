import * as convict from 'convict';

const schema = {
  service: {
    doc: 'UPT',
    format: String,
    default: 'UPT service',
    env: 'SERVICE',
  }
}

const config = convict(schema);
type Config = Record<keyof typeof schema, any>;
config.validate({ allowed: 'strict' });
export { config, Config };

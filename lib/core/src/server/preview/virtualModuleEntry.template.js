/* eslint-disable import/no-unresolved */
import { addDecorator, addParameters, addLoader, addArgTypesEnhancer } from '{{clientApi}}';
import { logger } from '{{clientLogger}}';
import * as config from '{{configFilename}}';

Object.entries(config).forEach(([key, value]) => {
  switch (key) {
    case 'args':
    case 'argTypes': {
      return logger.warn('Invalid args/argTypes in config, ignoring.', JSON.stringify(value));
    }
    case 'decorators': {
      return value.forEach((decorator) => addDecorator(decorator, false));
    }
    case 'loaders': {
      return value.forEach((loader) => addLoader(loader, false));
    }
    case 'parameters': {
      return addParameters({ ...value }, false);
    }
    case 'argTypesEnhancers': {
      return value.forEach((enhancer) => addArgTypesEnhancer(enhancer));
    }
    case 'globals':
    case 'globalTypes': {
      return addParameters({ [key]: value }, false);
    }
    default: {
      return console.log(`${key} was not supported`);
    }
  }
});

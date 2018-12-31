import {Configuration} from './api/configuration';

export function apiConfigurationFactory(): Configuration {
  const configuration = new Configuration({apiKeys: {}});

  const userJSON = localStorage.getItem('currentUser'); // TODO: user authentication service
  if (userJSON) {
    configuration.apiKeys['Authorization'] = `Bearer ${JSON.parse(userJSON).token}`;
  }

  console.log(configuration);

  return configuration;
}

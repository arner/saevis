import {AuthenticationService} from './auth/authentication.service';
import {Configuration} from './api/configuration';

export function apiConfigurationFactory(): Configuration {
  const configuration = new Configuration({apiKeys: {}});

  const userJSON = localStorage.getItem('currentUser');
  if (userJSON) {
    configuration.apiKeys['Authorization'] = `Bearer ${JSON.parse(userJSON).token}`;
  }

  return configuration;
}

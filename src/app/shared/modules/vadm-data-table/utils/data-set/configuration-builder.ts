/**
 * Created by zmorhir on 24/03/2020.
 */

import {Column} from './column';
import {Configuration} from './configuration';

export class ConfigurationBuilder {

  private config = new Configuration();

  column(code: string, label: string, isLink?: boolean): this {
    this.config.columns.push(new Column(code, label, isLink));
    return this;
  }

  build(): Configuration {
    return this.config;
  }
}

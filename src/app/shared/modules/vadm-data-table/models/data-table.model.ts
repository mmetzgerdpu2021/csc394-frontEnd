export class DataTableConfiguration {

    darkMode = false;

    columns = new Array<DataTableColumn>();

    actions = new Array<DataTableActionItem>();

    constructor() {}
}


export class DataTableColumn {
    
    constructor(
        public code: string,
        public label: string
    ) {}
}


export class DataTableConfigurationBuilder {

    private _config = new DataTableConfiguration();
    
    column(code: string, label: string): this {
        this._config.columns.push(new DataTableColumn(code, label));
        return this;
    }

    action(code: string, label: string): this {
        this._config.actions.push(new DataTableActionItem(code, label));
        return this;
    }

    darkMode(): this {
        this._config.darkMode = true;
        return this;
    }

    lightMode(): this {
        this._config.darkMode = false;
        return this;
    }

    build(): DataTableConfiguration {
        return this._config;
    }
}


export class DataTableActionItem {

    constructor(public code: string, public label: string) { }

}
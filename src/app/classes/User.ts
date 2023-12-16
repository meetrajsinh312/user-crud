class IObjectKeys {
    [key: string]: string | number | string[] | { line1: string }[];
}

export class User extends IObjectKeys {
    constructor(
        public name: string,
        public email: string,
        public gender: string,
        public role: string,
        public address: any,
        public uid?: any
    ) {
        super();
    }
}


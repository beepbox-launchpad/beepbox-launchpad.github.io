export declare function applyElementArgs<T extends HTMLElement | SVGElement | DocumentFragment>(element: T, args: Array<any>): T;
export declare const svgNS: string;
export declare function parseHTML(...args: Array<any>): DocumentFragment;
export declare function parseSVG(...args: Array<any>): DocumentFragment;
export declare function replaceScriptWith(...args: Array<any>): void;
export declare function applyToElement<T extends HTMLElement | SVGElement | DocumentFragment>(element: T, ...args: Array<any>): T;

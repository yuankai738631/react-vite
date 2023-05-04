import {ReactElement, ReactNode} from "react";

interface RouteItems {
    path: string;
    title?: string;
    element?: ReactElement,
    children?: RouteItems[],
    icon?: ReactElement
}

interface RouteObject {
    title?: string;
    children?: RouteObject[];
    element?: ReactNode;
    path?: string;
    icon?: ReactElement;
    bread?: string[];
}
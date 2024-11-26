import { component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { config } from "~/speak-config";

/*export const onGet: RequestHandler = async ({
    params,
    redirect,
}) => {
    if (!params.lang) {
        throw redirect(301, `/${config.defaultLocale.lang}/`);
    }
};*/

export default component$(() => {
    return (
        <h1>Hello World</h1>
    );
}); 


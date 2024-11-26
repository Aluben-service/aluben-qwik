import {component$, Slot} from '@builder.io/qwik'
import type {RequestHandler} from '@builder.io/qwik-city'
import {guessLocale, locales} from 'compiled-i18n'
import { InvisibleNav } from '~/components/InvisibleNav'

const replaceLocale = (pathname: string, oldLocale: string, locale: string) => {
	const idx = pathname.indexOf(oldLocale)
	return (
		pathname.slice(0, idx) + locale + pathname.slice(idx + oldLocale.length)
	)
}

export const onRequest: RequestHandler = async ({
	request,
	url,
	redirect,
	pathname,
	params,
	locale,
}) => {
	if (locales.includes(params.locale)) {
		// Set the locale for this request
		locale(params.locale)
	} else {
		const acceptLang = request.headers.get('accept-language')
		// Redirect to the correct locale
		const guessedLocale = guessLocale(acceptLang)
		const path =
			// You can use `__` as the locale in URLs to auto-select it
			params.locale === '__' ||
			/^([a-z]{2})([_-]([a-z]{2}))?$/i.test(params.locale)
				? // invalid locale
					`/${replaceLocale(pathname, params.locale, guessedLocale)}`
				: // no locale
					`/${guessedLocale}${pathname}`
		throw redirect(301, `${path}${url.search}`)
	}
}

export default component$(() => {
	return (
		<>
			<InvisibleNav />
			<Slot />
		</>
	)
})